import type { APIRoute } from "astro";
import { getSecret } from "astro:env/server";
import { z } from "astro/zod";
import { MESSAGE_MAX, packageChoices } from "../../data/studio";

export const prerender = false;

const TO = "me@lorenzomarchisio.me";
// Must be an address on a domain verified in Resend.
const FROM = "Lorenzo Marchisio <noreply@lorenzomarchisio.me>";

const LIMITS = { name: 100, email: 200, message: 5000 };

// Five tries per visitor per ten minutes: more than a person needs, too few for
// a script that gets past the honeypot to bury the inbox or use up the Resend
// quota. The count lives in this worker instance's memory, so it stops one
// client hammering the form, not traffic spread over many instances or
// addresses. For that, add a rate-limiting rule on /api/send-email in the
// Cloudflare dashboard.
const RATE = { tries: 5, windowMs: 10 * 60 * 1000 };
const recent = new Map<string, number[]>();

const allow = (client: string) => {
  const now = Date.now();
  const tries = (recent.get(client) ?? []).filter((t) => now - t < RATE.windowMs);
  if (tries.length >= RATE.tries) return false;
  // Caps the memory a flood of distinct addresses can take.
  if (recent.size > 1000) recent.clear();
  recent.set(client, [...tries, now]);
  return true;
};

const json = (body: object, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const message = (text: string, status: number) => json({ message: text }, status);

const send = async (email: object) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getSecret("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, ...email }),
  });
  if (!response.ok)
    console.error("Resend rejected the message:", response.status, await response.text());
  return response.ok;
};

// ---- project inquiry (the /websites form) ---------------------------------

// Blank optional fields arrive as "" from a plain form post.
const optionalText = (max: number) => z.string().trim().max(max).optional().default("");

const inquirySchema = z
  .object({
    type: z.literal("project-inquiry"),
    name: z.string().trim().min(1).max(100),
    business: z.string().trim().min(1).max(200),
    email: z.string().trim().min(1).max(200).email(),
    phone: optionalText(50),
    message: optionalText(MESSAGE_MAX),
    // Hidden, from ?package=; anything unknown is dropped rather than refused.
    package: z.enum(packageChoices).optional().catch(undefined),
    ref: optionalText(100),
    company: z.string().optional(), // honeypot, checked before parsing
  })
  // Unknown fields are dropped, not refused: a page cached from before a form
  // change still submits, instead of failing with nothing to show the visitor.
  .strip();

// Field → the error code the page turns into a message in its own language.
const errorCode = (field: string, issue: z.ZodIssue) => {
  if (issue.code === "too_big") return "tooLong";
  if (field === "email" && issue.code === "invalid_string") return "email";
  return "required";
};

// Deliberately free of anything the visitor typed: the reply goes to whatever
// address was entered, so it must not be a way to mail someone else a message.
const autoReply = {
  subject: "Your project request",
  text: "Hello,\n\nThank you for your project request. I'll reply within one working day to set up a free 30-minute video call.\n\nIf you want to add anything in the meantime, reply to this email.\n\nLorenzo Marchisio\nhttps://lorenzomarchisio.me/websites",
};

const oneLine = (s: string) => s.replace(/\s+/g, " ");

async function projectInquiry(body: Record<string, unknown>, viaFetch: boolean) {
  // A plain form post lands back on the page, where :target shows the notice.
  const back = (anchor: "sent" | "send-error") =>
    new Response(null, { status: 303, headers: { Location: `/websites#${anchor}` } });

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    if (!viaFetch) return back("send-error");
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "");
      if (field && !errors[field]) errors[field] = errorCode(field, issue);
    }
    return json({ errors }, 422);
  }

  const d = parsed.data;
  const pkg = d.package ?? "none";
  const delivered = await send({
    to: TO,
    reply_to: d.email,
    subject: oneLine(`[Project] ${d.business} — ${pkg}`),
    text: [
      `Name: ${d.name}`,
      `Business: ${d.business}`,
      `Email: ${d.email}`,
      `Phone: ${d.phone || "—"}`,
      `Package clicked: ${pkg}`,
      `Ref: ${d.ref || "—"}`,
      "",
      d.message || "(no message)",
    ].join("\n"),
  });
  if (!delivered) return viaFetch ? message("Failed to send", 502) : back("send-error");

  // Conversion count without personal data; read it in the worker logs.
  console.log(
    JSON.stringify({ event: "project-inquiry", package: pkg, ref: d.ref }),
  );

  // Best effort: the request already reached me, so a failed confirmation
  // must not tell the visitor to send it again.
  await send({ to: d.email, reply_to: TO, ...autoReply });

  return viaFetch ? message("Request sent", 201) : back("sent");
}

// ---- entry ------------------------------------------------------------------

// JSON from the fetch submits; urlencoded from a project form sent without
// JavaScript.
async function readBody(request: Request, viaFetch: boolean): Promise<Record<string, unknown>> {
  if (viaFetch) return await request.json();
  return Object.fromEntries(await request.formData());
}

export const POST: APIRoute = async ({ request }) => {
  const viaFetch = (request.headers.get("Content-Type") ?? "").includes("application/json");

  let body: Record<string, unknown>;
  try {
    body = await readBody(request, viaFetch);
    if (!body || typeof body !== "object") throw new TypeError("not an object");
  } catch {
    return message("Please fill in all fields", 400);
  }
  const project = body.type === "project-inquiry";

  // Honeypot: hidden in both forms, so anything here is a bot. Answer success
  // so it has no signal to retry against.
  if (String(body.company ?? "").trim()) {
    if (!project) return message("Email sent successfully", 200);
    return viaFetch
      ? message("Request sent", 201)
      : new Response(null, { status: 303, headers: { Location: "/websites#sent" } });
  }

  // Cloudflare sets this header at its edge, so a client cannot forge it. It is
  // absent in local dev, where every request shares one count.
  if (!allow(request.headers.get("CF-Connecting-IP") ?? "")) {
    if (project && !viaFetch)
      return new Response(null, { status: 303, headers: { Location: "/websites#send-error" } });
    return message("Too many messages. Please try again later.", 429);
  }

  if (project) return projectInquiry(body, viaFetch);
  if (!viaFetch) return message("Please fill in all fields", 400);

  // ---- contact (the home page form) ----
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const text = String(body.message ?? "").trim();

  if (!name || !email || !text) {
    return message("Please fill in all fields", 400);
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    text.length > LIMITS.message
  ) {
    return message("That message is too long", 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return message("Please enter a valid email address", 400);
  }

  const sent = await send({
    to: TO,
    reply_to: email,
    subject: `Portfolio contact — ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${text}`,
  });
  if (!sent) return message("Failed to send message. Please try again.", 502);

  return message("Email sent successfully", 200);
};

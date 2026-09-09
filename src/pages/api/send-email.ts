import type { APIRoute } from "astro";
import { getSecret } from "astro:env/server";

export const prerender = false;

const TO = "me@lorenzomarchisio.dev";
// Must be an address on a domain verified in Resend.
const FROM = "Portfolio <noreply@lorenzomarchisio.dev>";

const LIMITS = { name: 100, email: 200, message: 5000 };

const json = (message: string, status: number) =>
  new Response(JSON.stringify({ message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json("Please fill in all fields", 400);
  }

  // Honeypot: hidden in the form, so anything here is a bot. Answer 200 so it
  // has no signal to retry against.
  if (String(body.company ?? "").trim()) {
    return json("Email sent successfully", 200);
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return json("Please fill in all fields", 400);
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message
  ) {
    return json("That message is too long", 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json("Please enter a valid email address", 400);
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getSecret("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: TO,
      reply_to: email,
      subject: `Portfolio contact — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    console.error("Resend rejected the message:", response.status, await response.text());
    return json("Failed to send message. Please try again.", 502);
  }

  return json("Email sent successfully", 200);
};

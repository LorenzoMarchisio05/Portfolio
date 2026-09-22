import type { APIRoute } from "astro";
import { isLocale } from "../i18n/locales";

// Every page lives under a language, so / is not a page: it sends the visitor
// to the one their browser asks for first, English when none matches. Nothing
// is remembered (no cookies, see the privacy policy); a visitor who switches
// language keeps it in the URL.
export const prerender = false;

export const GET: APIRoute = ({ request }) => {
  const lang =
    (request.headers.get("Accept-Language") ?? "")
      .split(",")
      .map((tag) => tag.trim().slice(0, 2).toLowerCase())
      .find(isLocale) ?? "en";
  return new Response(null, {
    status: 302,
    headers: { Location: `/${lang}/`, Vary: "Accept-Language" },
  });
};

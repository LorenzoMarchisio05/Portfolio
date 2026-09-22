import en from "./en";
import it from "./it";
import fr from "./fr";
import { isLocale, locales, type Locale } from "./locales";

export * from "./locales";

export const dictionaries = { en, it, fr };

// The first path segment names the page's language. Anything without one
// reads as English.
export const localeOf = (url: URL): Locale => {
  const first = url.pathname.split("/")[1];
  return isLocale(first) ? first : "en";
};

/** The same page in another language. */
export const localize = (url: URL, lang: Locale) =>
  `/${lang}${url.pathname.replace(new RegExp(`^/(${locales.join("|")})(?=/|$)`), "") || "/"}`;

/** getStaticPaths for a page that exists once per language. */
export const localeParams = () => locales.map((lang) => ({ params: { lang } }));

/**
 * The page's language, its words, and `href` to put a site path under it:
 * href("/websites") is "/it/websites" on an Italian page.
 */
export const useI18n = (url: URL) => {
  const lang = localeOf(url);
  return { lang, t: dictionaries[lang], href: (path: string) => `/${lang}${path}` };
};

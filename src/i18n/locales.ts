// The site's languages. Every page lives under one of these as its first path
// segment; there is no page at the root. Imports nothing, so plain-TypeScript
// modules (pricing, the API route) can use it.
export const locales = ["en", "it", "fr"] as const;
export type Locale = (typeof locales)[number];

export const isLocale = (value: unknown): value is Locale =>
  locales.includes(value as Locale);

// What Intl formats money and dates with: en-IE puts the € in front, fr-BE is
// French as written in Brussels.
export const intlLocale: Record<Locale, string> = { en: "en-IE", it: "it-IT", fr: "fr-BE" };

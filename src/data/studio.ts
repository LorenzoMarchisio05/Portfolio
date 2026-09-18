// Values shared by the project schema, the project form and the endpoint that
// receives it, so they cannot drift. Plain TypeScript with no Astro imports:
// the API route imports this and must not pull in astro:content.

export const STUDIO_NAME = "Lorenzo Marchisio";
export const STUDIO_EMAIL = "me@lorenzomarchisio.me";

/** Languages a client site can be built in. */
export const allLanguages = ["en", "it", "nl", "fr", "de"] as const;

// Form-only choices.
export const packageChoices = ["launch", "presence", "business", "custom"] as const;
export const MESSAGE_MAX = 2000;

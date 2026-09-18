import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { allLanguages, packageChoices } from "./data/studio";

const projects = defineCollection({
  loader: glob({
    pattern: "*/project.yaml",
    base: "./src/content/projects",
    // id = folder name, e.g. "cafe-nord"; also the gallery anchor and the
    // project page slug.
    generateId: ({ entry }) => entry.split("/")[0],
  }),
  schema: ({ image }) =>
    z
      .object({
        // The project page's URL. A GUID, not the client's name: generate one
        // with `uuidgen` and never change it once the page is published.
        slug: z.string().uuid(),
        status: z.enum(["live", "concept", "archived"]),
        clientName: z.string(),
        category: z.string(), // as shown, e.g. "Café"
        location: z.object({
          city: z.string(),
          country: z.string(),
        }),
        package: z.enum(packageChoices),
        languages: z.array(z.enum(allLanguages)).min(1),
        integrations: z.array(z.string()).default([]),
        stack: z.array(z.string()).default([]),
        liveUrl: z.string().url().optional(),
        conceptUrl: z.string().url().optional(),
        launchedAt: z.coerce.date().optional(),
        deliveryDays: z.number().int().positive().optional(),
        carePlan: z.boolean().default(false),
        featured: z.boolean().default(false),
        featuredScreenshot: z.enum(["desktop", "mobile"]).default("desktop"),
        order: z.number().int().default(100),

        screenshots: z.object({
          desktop: image(),
          mobile: image(),
        }),

        text: z.object({
          summary: z.string().max(200),
          before: z.string(),
          built: z.array(z.string()).min(1),
          alt: z.object({
            desktop: z.string(),
            mobile: z.string(),
          }),
          // The body of the project page: a heading, its paragraphs and, for
          // the parts of the site worth seeing, one screenshot.
          sections: z
            .array(
              z.object({
                title: z.string(),
                body: z.array(z.string()).min(1),
                image: image().optional(),
                alt: z.string().optional(),
              }),
            )
            .default([]),
          seo: z
            .object({ title: z.string().max(60), description: z.string().max(155) })
            .optional(),
        }),

        results: z
          .array(
            z.object({
              label: z.string(),
              value: z.string(),
              measuredAt: z.coerce.date(),
              source: z.string(),
            }),
          )
          .default([]),

        testimonial: z
          .object({
            author: z.string(),
            role: z.string(),
            quote: z.string(), // word for word
          })
          .optional(),

        metrics: z
          .object({
            measuredAt: z.coerce.date(),
            source: z.literal("pagespeed-insights"),
            strategy: z.literal("mobile"),
            performance: z.number().min(0).max(100),
            accessibility: z.number().min(0).max(100),
            bestPractices: z.number().min(0).max(100),
            seo: z.number().min(0).max(100),
          })
          .optional(),

        consent: z.object({
          showWork: z.boolean(),
          showName: z.boolean(),
          testimonial: z.boolean(),
          creditLink: z.boolean().default(false), // "Website by" link on the client site
          recordedAt: z.coerce.date().optional(),
        }),
      })
      .superRefine((p, ctx) => {
        const issue = (message: string) => ctx.addIssue({ code: "custom", message });
        if (p.status === "live") {
          if (!p.liveUrl) issue("Live projects need liveUrl");
          if (!p.launchedAt) issue("Live projects need launchedAt");
          if (!p.consent.showWork || !p.consent.recordedAt)
            issue("Live projects need recorded client consent");
        }
        if (p.status === "concept") {
          if (!p.conceptUrl) issue("Concept projects need conceptUrl");
          if (p.liveUrl) issue("Concept projects cannot have liveUrl");
          if (p.testimonial) issue("Concept projects cannot have testimonials");
          if (p.results.length) issue("Concept projects cannot have business results");
        }
        if (p.testimonial && !p.consent.testimonial)
          issue("Testimonial present without consent");
        for (const section of p.text.sections)
          if (section.image && !section.alt) issue(`Section "${section.title}" needs alt text`);
      }),
});

export const collections = { projects };

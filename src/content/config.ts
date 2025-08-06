import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

const skills = defineCollection({
    loader: file("src/content/skills.json", {
        parser: (text: string) => JSON.parse(text).data,
    }),
    schema: z.object({
        name: z.string().nonempty(),
        logo: z.string().nonempty(),
    }),
});

const journey = defineCollection({
    loader: file("src/content/journey.json", {
        parser: (text: string) => JSON.parse(text).data,
    }),
    schema: z.object({
        date: z.string().nonempty(),
        company: z.string().nonempty(),
        location: z.string().optional(),
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        linkedContent: z.string().url().optional().or(z.null()),
    }),
});

export const collections = { skills, journey };

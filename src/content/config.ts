import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        desc: z.string(),
        authors: z.array(z.string()).default([SITE.author]),
        published: z.date(),
        modified: z.date().optional().nullable(),
        featured: z.boolean().optional(),
        tags: z.array(z.string()).default(["others"]),
        img: image()
          .refine(img => img.width >= 1200 && img.height >= 630, {
            message: "OpenGraph image must be at least 1200 X 630 pixels!",
          })
          .or(z.string())
          .optional(),
        alt: z.string().optional(),
        canonicalURL: z.string().optional(),
        draft: z.boolean().optional(),
      })
      .refine(({ img, alt }) => !img || (img && alt && alt.trim() != ""), {
        message:
          '"alt" must be provided when using "img". Be a good developer!',
        path: ["alt"],
      }),
});

export const collections = { blog };

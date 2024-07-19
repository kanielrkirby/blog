import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, published, modified, desc } = frontmatter;

  return (
    <li className="my-6">
      <a
        href={href}
        className="font-mono font-bold inline-block text-lg text-skin-base-faded hover:text-skin-accent transition-all duration-100 decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2>{title}</h2>
        ) : (
          <h3>{title}</h3>
        )}
      </a>
      <Datetime published={published} modified={modified} />
      <p>{desc}</p>
    </li>
  );
}

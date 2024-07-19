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
        className="inline-block font-mono text-lg font-bold text-skin-base-faded decoration-dashed underline-offset-4 transition-all duration-100 hover:text-skin-accent focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? <h2>{title}</h2> : <h3>{title}</h3>}
      </a>
      <Datetime published={published} modified={modified} />
      <p>{desc}</p>
    </li>
  );
}

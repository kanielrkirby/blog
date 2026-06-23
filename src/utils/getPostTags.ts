import type { CollectionEntry } from "astro:content";

const getPostTags = (post: CollectionEntry<"blog">) => {
  const directoryTags = post.id
    .split("/")
    .slice(0, -1)
    .filter(Boolean);

  return [...new Set([...directoryTags, ...post.data.tags])];
};

export default getPostTags;

import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts
    .filter(postFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modified ?? b.data.published).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modified ?? a.data.published).getTime() / 1000
        )
    );
};

export default getSortedPosts;

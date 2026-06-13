import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";
import { SITE } from "@config";
import postFilter from "@utils/postFilter";

export async function GET() {
  const posts = await getCollection("blog", postFilter);
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.url,
    items: sortedPosts.map(({ data, slug }) => ({
      link: `posts/${slug}/`,
      title: data.title,
      description: data.desc,
      pubDate: new Date(data.modified ?? data.published),
    })),
  });
}

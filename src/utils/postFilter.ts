import { SITE } from "@config";
import type { CollectionEntry } from "astro:content";

const postFilter = ({ data }: CollectionEntry<"blog">) => {
  const isPublishTimePassed =
    Date.now() > new Date(data.published).getTime() - SITE.scheduledPostMargin;
  return (
    !data.draft &&
    !data.archived &&
    (import.meta.env.DEV || isPublishTimePassed)
  );
};

export default postFilter;

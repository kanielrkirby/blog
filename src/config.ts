import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  url: "https://blog.kanielrkirby.com",
  author: "Kaniel Kirby",
  desc: "Here, we like to delve into the more obscure and distinct ecosystems of Software Development. If you are interested in topics like DevOps, reproducibility, or lower-level programming concepts, stick around! You might find something you like.",
  title: "The Cached Exception",
  img: "the-cached-exception-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en",
  langTag: ["en-EN"],
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/kanielrkirby",
    linkTitle: `My GitHub`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/kanielrkirby",
    linkTitle: `My LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:kanielrkirby@runbox.com",
    linkTitle: `My Email`,
    active: true,
  },
];

import type socialIcons from "@assets/socialIcons";

export type Site = {
  url: string;
  author: string;
  desc: string;
  title: string;
  img?: string;
  lightAndDarkMode: boolean;
  postPerPage: number;
  scheduledPostMargin: number;
};

export type SocialObjects = {
  name: keyof typeof socialIcons;
  href: string;
  active: boolean;
  linkTitle: string;
}[];

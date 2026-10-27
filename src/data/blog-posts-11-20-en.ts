import type { RawBlogPostInput } from './blog-posts';
import { BLOG_POSTS_11_12_EN_RAW } from './blog-posts-11-12-en';
import { BLOG_POSTS_13_14_EN_RAW } from './blog-posts-13-14-en';
import { BLOG_POSTS_15_16_EN_RAW } from './blog-posts-15-16-en';
import { BLOG_POSTS_17_18_EN_RAW } from './blog-posts-17-18-en';
import { BLOG_POSTS_19_20_EN_RAW } from './blog-posts-19-20-en';

export const NEW_BLOG_POSTS_11_20_EN_RAW: RawBlogPostInput[] = [
  ...BLOG_POSTS_11_12_EN_RAW,
  ...BLOG_POSTS_13_14_EN_RAW,
  ...BLOG_POSTS_15_16_EN_RAW,
  ...BLOG_POSTS_17_18_EN_RAW,
  ...BLOG_POSTS_19_20_EN_RAW,
];

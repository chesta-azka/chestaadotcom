import type { RawBlogPostInput } from './blog-posts';
import { BLOG_POSTS_11_12_ID_RAW } from './blog-posts-11-12-id';
import { BLOG_POSTS_13_14_ID_RAW } from './blog-posts-13-14-id';
import { BLOG_POSTS_15_16_ID_RAW } from './blog-posts-15-16-id';
import { BLOG_POSTS_17_18_ID_RAW } from './blog-posts-17-18-id';
import { BLOG_POSTS_19_20_ID_RAW } from './blog-posts-19-20-id';

export const NEW_BLOG_POSTS_11_20_ID_RAW: RawBlogPostInput[] = [
  ...BLOG_POSTS_11_12_ID_RAW,
  ...BLOG_POSTS_13_14_ID_RAW,
  ...BLOG_POSTS_15_16_ID_RAW,
  ...BLOG_POSTS_17_18_ID_RAW,
  ...BLOG_POSTS_19_20_ID_RAW,
];

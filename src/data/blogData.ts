import {
  BLOG_POSTS,
  getPublishedBlogPosts,
  getAuthorProfile,
  renderBlogPostHtml,
  BlogPost,
} from './blog-posts';

export interface Article {
  slug: string;
  title: string;
  cat: string;
  date: string;
  updatedAt?: string;
  readTime: string;
  readTimeMinutes: number;
  desc: string;
  featured?: boolean;
  recommended?: boolean;
  tags?: string[];
  content: (string | { type: 'image'; url: string; alt: string })[];
  mdxContent?: string;
  image?: string;
  coverAlt?: string;
  author?: {
    name: string;
    role: string;
    avatar?: string;
  };
}

function mapBlogPostToLegacyArticle(post: BlogPost): Article {
  const authorProfile = getAuthorProfile(post.author);
  const textBlocks: string[] = [];

  for (const block of post.content) {
    if (block.type === 'paragraph' || block.type === 'h2' || block.type === 'h3') {
      textBlocks.push(block.text);
    } else if (block.type === 'callout') {
      textBlocks.push(`${block.title}: ${block.text}`);
    } else if (block.type === 'blockquote') {
      textBlocks.push(block.quote);
    } else if (block.type === 'ul' || block.type === 'ol') {
      textBlocks.push(...block.items);
    }
  }

  return {
    slug: post.slug,
    title: post.title,
    cat: post.category,
    date: post.date,
    updatedAt: post.updatedAt,
    readTime: post.readTime,
    readTimeMinutes: post.readTimeMinutes,
    desc: post.metaDescription,
    featured: post.featured,
    recommended: post.featured,
    tags: post.tags,
    content: [...textBlocks, ...post.conclusion],
    mdxContent: renderBlogPostHtml(post),
    image: post.cover,
    coverAlt: post.coverAlt,
    author: {
      name: authorProfile.name,
      role: authorProfile.role,
      avatar: authorProfile.avatar,
    },
  };
}

export const ALL_ARTICLES: Article[] = getPublishedBlogPosts().map(mapBlogPostToLegacyArticle);
export { BLOG_POSTS, getPublishedBlogPosts };

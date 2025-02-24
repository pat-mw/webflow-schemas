import { WebflowCollections } from '../webflow.types';

export const BlogPostsMeta = {
  _collectionId: '64d65811b2155c72fcc429b2',
  _name: 'Blog Posts',
  _slug: 'blog-posts'
} as const;

export type BlogPostsMetaType = typeof BlogPostsMeta;

export interface BlogPostsRow {
  featured?: boolean;
  color?: string;
  /**
   * Reference to collection: 64d65811b2155c72fcc42a4b
   */
  author: WebflowCollections['Authors']['Row'];
  'blog-date': Date;
  'blog-category-2':
    | 'Announcement'
    | 'Event Recap'
    | 'BTS'
    | 'Artist Spotlight'
    | 'Insights'
    | 'Podcast';
  'est-read-time': number;
  'thumbnail-image': {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'main-image'?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'post-summary': string;
  'post-body'?: string;
  video?: string;
  'image-gallery'?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  }[];
  name: string;
}


export interface BlogPostsItem {
  meta: BlogPostsMetaType;
  row: BlogPostsRow;
}

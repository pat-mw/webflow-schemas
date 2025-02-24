import { WebflowCollections } from '../webflow.types';

export const AuthorsMeta = {
  _collectionId: '64d65811b2155c72fcc42a4b',
  _name: 'Authors',
  _slug: 'authors'
} as const;

export type AuthorsMetaType = typeof AuthorsMeta;

export interface AuthorsRow {
  picture: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  name: string;
}


export interface AuthorsItem {
  meta: AuthorsMetaType;
  row: AuthorsRow;
}

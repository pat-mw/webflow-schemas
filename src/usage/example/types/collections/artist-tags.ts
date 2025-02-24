import { WebflowCollections } from '../webflow.types';

export const ArtistTagsMeta = {
  _collectionId: '65801e578d8a3149071abcba',
  _name: 'Artist Tags',
  _slug: 'artist-tags'
} as const;

export type ArtistTagsMetaType = typeof ArtistTagsMeta;

export interface ArtistTagsRow {
  isfeatured?: boolean;
  rank?: number;
  name: string;
}


export interface ArtistTagsItem {
  meta: ArtistTagsMetaType;
  row: ArtistTagsRow;
}

import { WebflowCollections } from '../webflow.types';

export const LinksMeta = {
  _collectionId: '667aad3b830456d71b2487c2',
  _name: 'Links',
  _slug: 'links'
} as const;

export type LinksMetaType = typeof LinksMeta;

export interface LinksRow {
  to: string;
  title: string;
  'meta-image': {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'meta-description': string;
  name: string;
}


export interface LinksItem {
  meta: LinksMetaType;
  row: LinksRow;
}

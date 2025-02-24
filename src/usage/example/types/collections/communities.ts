import { WebflowCollections } from '../webflow.types';

export const CommunitiesMeta = {
  _collectionId: '64d65811b2155c72fcc42a4a',
  _name: 'Communities',
  _slug: 'communities'
} as const;

export type CommunitiesMetaType = typeof CommunitiesMeta;

export interface CommunitiesRow {
  'client-logo'?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'client-information'?: string;
  'client-information-summary'?: string;
  'website-link'?: string;
  'twitter-link'?: string;
  'facebook-link'?: string;
  email?: string;
  'phone-number'?: string;
  name: string;
}


export interface CommunitiesItem {
  meta: CommunitiesMetaType;
  row: CommunitiesRow;
}

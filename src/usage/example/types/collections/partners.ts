import { WebflowCollections } from '../webflow.types';

export const PartnersMeta = {
  _collectionId: '65d4c9a788082db8ff96f2ae',
  _name: 'Partners',
  _slug: 'partners'
} as const;

export type PartnersMetaType = typeof PartnersMeta;

export interface PartnersRow {
  category:
    | 'Studios'
    | 'Music Sync / Marketing'
    | 'Music Pitching'
    | 'Creator Membership'
    | 'Music Financing';
  'client-logo': {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'hero-image-background': {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'client-information-summary': string;
  'client-information': string;
  'cta-header'?: string;
  'cta-paragraph'?: string;
  'website-link': string;
  'client-video'?: string;
  'video-thumbnail'?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  name: string;
}


export interface PartnersItem {
  meta: PartnersMetaType;
  row: PartnersRow;
}

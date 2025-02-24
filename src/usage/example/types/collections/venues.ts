import { WebflowCollections } from '../webflow.types';

export const VenuesMeta = {
  _collectionId: '65dcae861710405f6e05b39d',
  _name: 'Venues',
  _slug: 'venues'
} as const;

export type VenuesMetaType = typeof VenuesMeta;

export interface VenuesRow {
  logo?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  website?: string;
  testimonial?: string;
  'venue-manager'?: string;
  latitude?: string;
  longitude?: string;
  'address-text'?: string;
  'google-maps-link'?: string;
  name: string;
}


export interface VenuesItem {
  meta: VenuesMetaType;
  row: VenuesRow;
}

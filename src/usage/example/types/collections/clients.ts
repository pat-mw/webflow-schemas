import { WebflowCollections } from '../webflow.types';

export const ClientsMeta = {
  _collectionId: '675aea74e53a7089e6bbdd16',
  _name: 'Clients',
  _slug: 'clients'
} as const;

export type ClientsMetaType = typeof ClientsMeta;

export interface ClientsRow {
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
  name: string;
}


export interface ClientsItem {
  meta: ClientsMetaType;
  row: ClientsRow;
}

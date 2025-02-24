import { WebflowCollections } from '../webflow.types';

export const CareersMeta = {
  _collectionId: '6526b04a716d4e594b071644',
  _name: 'Careers',
  _slug: 'careers'
} as const;

export type CareersMetaType = typeof CareersMeta;

export interface CareersRow {
  'job-description-intro': string;
  responsibilities?: string;
  background?: string;
  benefits?: string;
  live?: boolean;
  'applications-close': Date;
  name: string;
}


export interface CareersItem {
  meta: CareersMetaType;
  row: CareersRow;
}

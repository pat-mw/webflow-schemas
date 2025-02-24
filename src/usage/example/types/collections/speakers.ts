import { WebflowCollections } from '../webflow.types';

export const SpeakersMeta = {
  _collectionId: '64d65811b2155c72fcc42a48',
  _name: 'Speakers',
  _slug: 'speakers'
} as const;

export type SpeakersMetaType = typeof SpeakersMeta;

export interface SpeakersRow {
  'bio-summary'?: string;
  bio: string;
  picture?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'twitter-profile-link'?: string;
  'facebook-profile-link'?: string;
  'linkedin-profile-link'?: string;
  'instagram-profile-link'?: string;
  'company-name': string;
  'company-link': string;
  'company-role'?: string;
  name: string;
}


export interface SpeakersItem {
  meta: SpeakersMetaType;
  row: SpeakersRow;
}

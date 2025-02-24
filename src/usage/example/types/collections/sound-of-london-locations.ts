import { WebflowCollections } from '../webflow.types';

export const SoundOfLondonLocationsMeta = {
  _collectionId: '64d65811b2155c72fcc42a4c',
  _name: 'Sound Of London - Locations',
  _slug: 'sound-of-london-locations'
} as const;

export type SoundOfLondonLocationsMetaType = typeof SoundOfLondonLocationsMeta;

export interface SoundOfLondonLocationsRow {
  latitude: string;
  longitude: string;
  'event-name'?: string;
  address?: string;
  name: string;
}


export interface SoundOfLondonLocationsItem {
  meta: SoundOfLondonLocationsMetaType;
  row: SoundOfLondonLocationsRow;
}

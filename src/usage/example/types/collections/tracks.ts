import { WebflowCollections } from '../webflow.types';

export const TracksMeta = {
  _collectionId: '64d65811b2155c72fcc42a49',
  _name: 'Tracks',
  _slug: 'tracks'
} as const;

export type TracksMetaType = typeof TracksMeta;

export interface TracksRow {
  'track-url': string;
  'track-genre'?: 'Hip Hop' | 'R&B' | 'Pop' | 'Rock' | 'Electronic';
  'track-thumbnail'?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'track-number'?: number;
  duration?: string;
  name: string;
}


export interface TracksItem {
  meta: TracksMetaType;
  row: TracksRow;
}

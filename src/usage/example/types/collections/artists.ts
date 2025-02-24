import { WebflowCollections } from '../webflow.types';

export const ArtistsMeta = {
  _collectionId: '64d65811b2155c72fcc429d6',
  _name: 'Artists',
  _slug: 'artists'
} as const;

export type ArtistsMetaType = typeof ArtistsMeta;

export interface ArtistsRow {
  /**
   * Please note: Speakers should be excluded from Artist Collection pages: please set 'isExampleArtist' to TRUE for this to be the case. (Toggle is at the bottom of this form)
   */
  'artist-type':
    | 'Band'
    | 'DJ'
    | 'Visual Artist'
    | 'Performance Artist'
    | 'Fashion Designer'
    | 'Musician'
    | 'Dancer'
    | 'Dance Group'
    | 'Speaker'
    | 'DJ / Producer';
  /**
   * This is for the filtering
   */
  'artist-type-broad'?: 'Musician' | 'Band' | 'Dance' | 'Visual Artist' | 'Other' | 'DJ';
  /**
   * MultiReference to collection: 65801e578d8a3149071abcba
   */
  'artist-tags-2'?: WebflowCollections['Artist Tags']['Row'][];
  'artist-bio'?: string;
  'artist-bio-new'?: string;
  'artist-image-pre-event'?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'artist-image'?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'instagram-link'?: string;
  'spotify-link'?: string;
  'youtube-link'?: string;
  'soundcloud-link'?: string;
  'link-tiktok'?: string;
  'link-twitter'?: string;
  'website-link'?: string;
  'optional-website-text'?: string;
  /**
   * MultiReference to collection: 64d65811b2155c72fcc42990
   */
  event: WebflowCollections['Events']['Row'][];
  'artist-s-testimony'?: string;
  'artist-s-testimony-short'?: string;
  'spotify-embed-link'?: string;
  'soundcloud-embed-link'?: string;
  embedvideoid?: string;
  visuals?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  }[];
  /**
   * Reference to collection: 64d65811b2155c72fcc42a4a
   */
  community?: WebflowCollections['Communities']['Row'];
  'sound-of-london-day'?: number;
  isexampleartist?: boolean;
  'hide-agency'?: boolean;
  name: string;
}


export interface ArtistsItem {
  meta: ArtistsMetaType;
  row: ArtistsRow;
}

import { WebflowCollections } from '../webflow.types';

export const EventsMeta = {
  _collectionId: '64d65811b2155c72fcc42990',
  _name: 'Events',
  _slug: 'events'
} as const;

export type EventsMetaType = typeof EventsMeta;

export interface EventsRow {
  /**
   * Reference to collection: 65dcae861710405f6e05b39d
   */
  'event-venue'?: WebflowCollections['Venues']['Row'];
  /**
   * Reference to collection: 675efaef79874b35a7d94136
   */
  'event-category'?: WebflowCollections['Event Categories']['Row'];
  /**
   * MultiReference to collection: 665879d8aa2dc8a86509bced
   */
  'event-tags'?: WebflowCollections['Event Tags']['Row'][];
  location?: string;
  'location-link-google-maps'?: string;
  'start-date-time': Date;
  'end-date-time-2': Date;
  'pre-event-summary'?: string;
  'event-description-2'?: string;
  image?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'event-poster-long-banner'?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'event-poster-landscape-a3-4'?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'event-poster-portrait-a3-4'?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'external-ticket-link'?: string;
  upcoming?: boolean;
  'post-event-summary'?: string;
  'event-photos'?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  }[];
  recap?: string;
  /**
   * MultiReference to collection: 64d65811b2155c72fcc429d6
   */
  'event-artists'?: WebflowCollections['Artists']['Row'][];
  'series-name':
    | 'Origins Series'
    | 'Unheard Series'
    | 'Other'
    | 'Focus Series'
    | 'Festival'
    | 'Amplify Your Music';
  'lineup-background-colour'?: string;
  'main-colour-2'?: string;
  'main-colour-3'?: string;
  'light-colour-1'?: string;
  'light-colour-2'?: string;
  'dark-colour-for-text'?: string;
  'event-recap-video'?: string;
  'video-thumbnail'?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'tickettailor-embed-code'?: string;
  'posh-embed-source'?: string;
  'skiddle-embed-2'?: string;
  'custom-event-page'?: string;
  /**
   * Reference to collection: 64d65811b2155c72fcc429b2
   */
  'event-recap-blog-post'?: WebflowCollections['Blog Posts']['Row'];
  name: string;
}


export interface EventsItem {
  meta: EventsMetaType;
  row: EventsRow;
}

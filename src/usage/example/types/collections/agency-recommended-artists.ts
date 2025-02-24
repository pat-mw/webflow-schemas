import { WebflowCollections } from '../webflow.types';

export const AgencyRecommendedArtistsMeta = {
  _collectionId: '6758549e07324cd55606fc69',
  _name: 'Agency - Recommended Artists',
  _slug: 'agency-recommended-artists'
} as const;

export type AgencyRecommendedArtistsMetaType = typeof AgencyRecommendedArtistsMeta;

export interface AgencyRecommendedArtistsRow {
  tab: number;
  'short-bio'?: string;
  'video-link': string;
  /**
   * Reference to collection: 64d65811b2155c72fcc429d6
   */
  'artist-link': WebflowCollections['Artists']['Row'];
  'video-id'?: string;
  name: string;
}


export interface AgencyRecommendedArtistsItem {
  meta: AgencyRecommendedArtistsMetaType;
  row: AgencyRecommendedArtistsRow;
}

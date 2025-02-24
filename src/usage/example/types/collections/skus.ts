import { WebflowCollections } from '../webflow.types';

export const SkusMeta = {
  _collectionId: '64d65811b2155c72fcc42a47',
  _name: 'SKUs',
  _slug: 'skus'
} as const;

export type SkusMetaType = typeof SkusMeta;

export interface SkusRow {
  'sku-values': string;
  /**
   * Reference to collection: 64d65811b2155c72fcc42a2e
   */
  product: WebflowCollections['Products']['Row'];
  'main-image'?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'more-images'?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  }[];
  price: string;
  'compare-at-price'?: string;
  'download-files'?: string;
  'ec-sku-subscription-plan'?: string;
  width?: number;
  length?: number;
  height?: number;
  weight?: number;
  sku?: string;
  'ec-sku-billing-method'?: string;
  name: string;
}


export interface SkusItem {
  meta: SkusMetaType;
  row: SkusRow;
}

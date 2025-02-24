import { WebflowCollections } from '../webflow.types';

export const ProductsMeta = {
  _collectionId: '64d65811b2155c72fcc42a2e',
  _name: 'Products',
  _slug: 'products'
} as const;

export type ProductsMetaType = typeof ProductsMeta;

export interface ProductsRow {
  'sku-properties'?: string;
  /**
   * MultiReference to collection: 64d65811b2155c72fcc42a13
   */
  category?: WebflowCollections['Categories']['Row'][];
  description?: string;
  shippable?: boolean;
  'tax-category'?: string;
  /**
   * Reference to collection: 64d65811b2155c72fcc42a47
   */
  'default-sku'?: WebflowCollections['SKUs']['Row'];
  'ec-product-type'?: 'Physical' | 'Digital' | 'Service' | 'Membership' | 'Advanced';
  'further-details-2'?: string;
  /**
   * e.g. clothing, art, collectibles, etc.
   */
  'merch-type': 'clothing' | 'artwork' | 'collectibles' | 'event';
  'size-guide'?: string;
  'longer-description'?: string;
  'sold-out-message-2'?: string;
  'max-order-quantity': number;
  name: string;
}


export interface ProductsItem {
  meta: ProductsMetaType;
  row: ProductsRow;
}

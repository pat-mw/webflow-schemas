import { WebflowCollections } from '../webflow.types';

export const CategoriesMeta = {
  _collectionId: '64d65811b2155c72fcc42a13',
  _name: 'Categories',
  _slug: 'categories'
} as const;

export type CategoriesMetaType = typeof CategoriesMeta;

export interface CategoriesRow {
  name: string;
}


export interface CategoriesItem {
  meta: CategoriesMetaType;
  row: CategoriesRow;
}

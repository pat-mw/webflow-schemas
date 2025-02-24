import { WebflowCollections } from '../webflow.types';

export const EventCategoriesMeta = {
  _collectionId: '675efaef79874b35a7d94136',
  _name: 'Event Categories',
  _slug: 'event-categories'
} as const;

export type EventCategoriesMetaType = typeof EventCategoriesMeta;

export interface EventCategoriesRow {
  colour: string;
  name: string;
}


export interface EventCategoriesItem {
  meta: EventCategoriesMetaType;
  row: EventCategoriesRow;
}

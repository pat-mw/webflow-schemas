import { WebflowCollections } from '../webflow.types';

export const EventTagsMeta = {
  _collectionId: '665879d8aa2dc8a86509bced',
  _name: 'Event Tags',
  _slug: 'event-tags'
} as const;

export type EventTagsMetaType = typeof EventTagsMeta;

export interface EventTagsRow {
  colour: string;
  name: string;
}


export interface EventTagsItem {
  meta: EventTagsMetaType;
  row: EventTagsRow;
}

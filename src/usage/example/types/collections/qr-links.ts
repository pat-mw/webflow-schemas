import { WebflowCollections } from '../webflow.types';

export const QrLinksMeta = {
  _collectionId: '64f88c8601a76f7e31ee99f3',
  _name: 'QR Links',
  _slug: 'qr-links'
} as const;

export type QrLinksMetaType = typeof QrLinksMeta;

export interface QrLinksRow {
  to: string;
  title: string;
  name: string;
}


export interface QrLinksItem {
  meta: QrLinksMetaType;
  row: QrLinksRow;
}

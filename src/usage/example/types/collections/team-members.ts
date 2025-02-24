import { WebflowCollections } from '../webflow.types';

export const TeamMembersMeta = {
  _collectionId: '64d65811b2155c72fcc429ee',
  _name: 'Team Members',
  _slug: 'team-members'
} as const;

export type TeamMembersMetaType = typeof TeamMembersMeta;

export interface TeamMembersRow {
  position: string;
  photo?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'link-to-linkedin'?: string;
  'link-to-instagram'?: string;
  'short-bio'?: string;
  name: string;
}


export interface TeamMembersItem {
  meta: TeamMembersMetaType;
  row: TeamMembersRow;
}

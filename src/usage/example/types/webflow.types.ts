/**
 * Webflow Collections Type System
 * ------------------------------
 * 
 * Usage:
 * 1. For collection rows (content):
 *    type Products = Collection<'Products'>
 * 
 * 2. For collection metadata:
 *    type ProductsMeta = CollectionMeta<'Products'>
 * 
 * 3. For collection relationships:
 *    type ProductsRelations = CollectionRelations<'Products'>
 * 
 * 4. Direct access to collection types:
 *    type ProductsData = WebflowCollections['Products']['Row']
 *    type ProductsMeta = WebflowCollections['Products']['meta']
 *    type ProductsRefs = WebflowCollections['Products']['refs']['product-category']
 */

export interface WebflowCollections {
  "Events": {
    meta: {
  _collectionId: '64d65811b2155c72fcc42990';
  slug: 'events';
  displayName: 'Events';
}

    Row: {
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

    refs: {
    /** Reference to collection: 65dcae861710405f6e05b39d */
    'event-venue'?: WebflowCollections["Venues"]['Row'] | { _id: string; _reference: '65dcae861710405f6e05b39d'; [k: string]: unknown; };
    /** Reference to collection: 675efaef79874b35a7d94136 */
    'event-category'?: WebflowCollections["Event Categories"]['Row'] | { _id: string; _reference: '675efaef79874b35a7d94136'; [k: string]: unknown; };
    /** MultiReference to collection: 665879d8aa2dc8a86509bced */
    'event-tags'?: (WebflowCollections["Event Tags"]['Row'] | { _id: string; _reference: '665879d8aa2dc8a86509bced'; [k: string]: unknown; })[];
    /** MultiReference to collection: 64d65811b2155c72fcc429d6 */
    'event-artists'?: (WebflowCollections["Artists"]['Row'] | { _id: string; _reference: '64d65811b2155c72fcc429d6'; [k: string]: unknown; })[];
    /** Reference to collection: 64d65811b2155c72fcc429b2 */
    'event-recap-blog-post'?: WebflowCollections["Blog Posts"]['Row'] | { _id: string; _reference: '64d65811b2155c72fcc429b2'; [k: string]: unknown; };
    };
    Relations: [
      {
        foreignCollection: "65dcae861710405f6e05b39d",
        fieldName: "event-venue",
        isMultiple: false,
        isRequired: false,
      },
      {
        foreignCollection: "675efaef79874b35a7d94136",
        fieldName: "event-category",
        isMultiple: false,
        isRequired: false,
      },
      {
        foreignCollection: "665879d8aa2dc8a86509bced",
        fieldName: "event-tags",
        isMultiple: true,
        isRequired: false,
      },
      {
        foreignCollection: "64d65811b2155c72fcc429d6",
        fieldName: "event-artists",
        isMultiple: true,
        isRequired: false,
      },
      {
        foreignCollection: "64d65811b2155c72fcc429b2",
        fieldName: "event-recap-blog-post",
        isMultiple: false,
        isRequired: false,
      },
    ];
  };

  "Blog Posts": {
    meta: {
  _collectionId: '64d65811b2155c72fcc429b2';
  slug: 'blog-posts';
  displayName: 'Blog Posts';
}

    Row: {
  featured?: boolean;
  color?: string;
  /**
   * Reference to collection: 64d65811b2155c72fcc42a4b
   */
  author: WebflowCollections['Authors']['Row'];
  'blog-date': Date;
  'blog-category-2':
    | 'Announcement'
    | 'Event Recap'
    | 'BTS'
    | 'Artist Spotlight'
    | 'Insights'
    | 'Podcast';
  'est-read-time': number;
  'thumbnail-image': {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'main-image'?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'post-summary': string;
  'post-body'?: string;
  video?: string;
  'image-gallery'?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  }[];
  name: string;
}

    refs: {
    /** Reference to collection: 64d65811b2155c72fcc42a4b */
    'author': WebflowCollections["Authors"]['Row'] | { _id: string; _reference: '64d65811b2155c72fcc42a4b'; [k: string]: unknown; };
    };
    Relations: [
      {
        foreignCollection: "64d65811b2155c72fcc42a4b",
        fieldName: "author",
        isMultiple: false,
        isRequired: true,
      },
    ];
  };

  "Artists": {
    meta: {
  _collectionId: '64d65811b2155c72fcc429d6';
  slug: 'artists';
  displayName: 'Artists';
}

    Row: {
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

    refs: {
    /** MultiReference to collection: 65801e578d8a3149071abcba */
    'artist-tags-2'?: (WebflowCollections["Artist Tags"]['Row'] | { _id: string; _reference: '65801e578d8a3149071abcba'; [k: string]: unknown; })[];
    /** MultiReference to collection: 64d65811b2155c72fcc42990 */
    'event': (WebflowCollections["Events"]['Row'] | { _id: string; _reference: '64d65811b2155c72fcc42990'; [k: string]: unknown; })[];
    /** Reference to collection: 64d65811b2155c72fcc42a4a */
    'community'?: WebflowCollections["Communities"]['Row'] | { _id: string; _reference: '64d65811b2155c72fcc42a4a'; [k: string]: unknown; };
    };
    Relations: [
      {
        foreignCollection: "65801e578d8a3149071abcba",
        fieldName: "artist-tags-2",
        isMultiple: true,
        isRequired: false,
      },
      {
        foreignCollection: "64d65811b2155c72fcc42990",
        fieldName: "event",
        isMultiple: true,
        isRequired: true,
      },
      {
        foreignCollection: "64d65811b2155c72fcc42a4a",
        fieldName: "community",
        isMultiple: false,
        isRequired: false,
      },
    ];
  };

  "Team Members": {
    meta: {
  _collectionId: '64d65811b2155c72fcc429ee';
  slug: 'team-members';
  displayName: 'Team Members';
}

    Row: {
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

    refs: {
    };
    Relations: [];
  };

  "Categories": {
    meta: {
  _collectionId: '64d65811b2155c72fcc42a13';
  slug: 'categories';
  displayName: 'Categories';
}

    Row: {
  name: string;
}

    refs: {
    };
    Relations: [];
  };

  "Products": {
    meta: {
  _collectionId: '64d65811b2155c72fcc42a2e';
  slug: 'products';
  displayName: 'Products';
}

    Row: {
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

    refs: {
    /** MultiReference to collection: 64d65811b2155c72fcc42a13 */
    'category'?: (WebflowCollections["Categories"]['Row'] | { _id: string; _reference: '64d65811b2155c72fcc42a13'; [k: string]: unknown; })[];
    /** Reference to collection: 64d65811b2155c72fcc42a47 */
    'default-sku'?: WebflowCollections["SKUs"]['Row'] | { _id: string; _reference: '64d65811b2155c72fcc42a47'; [k: string]: unknown; };
    };
    Relations: [
      {
        foreignCollection: "64d65811b2155c72fcc42a13",
        fieldName: "category",
        isMultiple: true,
        isRequired: false,
      },
      {
        foreignCollection: "64d65811b2155c72fcc42a47",
        fieldName: "default-sku",
        isMultiple: false,
        isRequired: false,
      },
    ];
  };

  "SKUs": {
    meta: {
  _collectionId: '64d65811b2155c72fcc42a47';
  slug: 'skus';
  displayName: 'Skus';
}

    Row: {
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

    refs: {
    /** Reference to collection: 64d65811b2155c72fcc42a2e */
    'product': WebflowCollections["Products"]['Row'] | { _id: string; _reference: '64d65811b2155c72fcc42a2e'; [k: string]: unknown; };
    };
    Relations: [
      {
        foreignCollection: "64d65811b2155c72fcc42a2e",
        fieldName: "product",
        isMultiple: false,
        isRequired: true,
      },
    ];
  };

  "Speakers": {
    meta: {
  _collectionId: '64d65811b2155c72fcc42a48';
  slug: 'speakers';
  displayName: 'Speakers';
}

    Row: {
  'bio-summary'?: string;
  bio: string;
  picture?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'twitter-profile-link'?: string;
  'facebook-profile-link'?: string;
  'linkedin-profile-link'?: string;
  'instagram-profile-link'?: string;
  'company-name': string;
  'company-link': string;
  'company-role'?: string;
  name: string;
}

    refs: {
    };
    Relations: [];
  };

  "Tracks": {
    meta: {
  _collectionId: '64d65811b2155c72fcc42a49';
  slug: 'tracks';
  displayName: 'Tracks';
}

    Row: {
  'track-url': string;
  'track-genre'?: 'Hip Hop' | 'R&B' | 'Pop' | 'Rock' | 'Electronic';
  'track-thumbnail'?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'track-number'?: number;
  duration?: string;
  name: string;
}

    refs: {
    };
    Relations: [];
  };

  "Communities": {
    meta: {
  _collectionId: '64d65811b2155c72fcc42a4a';
  slug: 'communities';
  displayName: 'Communities';
}

    Row: {
  'client-logo'?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'client-information'?: string;
  'client-information-summary'?: string;
  'website-link'?: string;
  'twitter-link'?: string;
  'facebook-link'?: string;
  email?: string;
  'phone-number'?: string;
  name: string;
}

    refs: {
    };
    Relations: [];
  };

  "Authors": {
    meta: {
  _collectionId: '64d65811b2155c72fcc42a4b';
  slug: 'authors';
  displayName: 'Authors';
}

    Row: {
  picture: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  name: string;
}

    refs: {
    };
    Relations: [];
  };

  "Sound Of London - Locations": {
    meta: {
  _collectionId: '64d65811b2155c72fcc42a4c';
  slug: 'sound-of-london-locations';
  displayName: 'Sound Of London Locations';
}

    Row: {
  latitude: string;
  longitude: string;
  'event-name'?: string;
  address?: string;
  name: string;
}

    refs: {
    };
    Relations: [];
  };

  "QR Links": {
    meta: {
  _collectionId: '64f88c8601a76f7e31ee99f3';
  slug: 'qr-links';
  displayName: 'Qr Links';
}

    Row: {
  to: string;
  title: string;
  name: string;
}

    refs: {
    };
    Relations: [];
  };

  "Careers": {
    meta: {
  _collectionId: '6526b04a716d4e594b071644';
  slug: 'careers';
  displayName: 'Careers';
}

    Row: {
  'job-description-intro': string;
  responsibilities?: string;
  background?: string;
  benefits?: string;
  live?: boolean;
  'applications-close': Date;
  name: string;
}

    refs: {
    };
    Relations: [];
  };

  "Artist Tags": {
    meta: {
  _collectionId: '65801e578d8a3149071abcba';
  slug: 'artist-tags';
  displayName: 'Artist Tags';
}

    Row: {
  isfeatured?: boolean;
  rank?: number;
  name: string;
}

    refs: {
    };
    Relations: [];
  };

  "Partners": {
    meta: {
  _collectionId: '65d4c9a788082db8ff96f2ae';
  slug: 'partners';
  displayName: 'Partners';
}

    Row: {
  category:
    | 'Studios'
    | 'Music Sync / Marketing'
    | 'Music Pitching'
    | 'Creator Membership'
    | 'Music Financing';
  'client-logo': {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'hero-image-background': {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'client-information-summary': string;
  'client-information': string;
  'cta-header'?: string;
  'cta-paragraph'?: string;
  'website-link': string;
  'client-video'?: string;
  'video-thumbnail'?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  name: string;
}

    refs: {
    };
    Relations: [];
  };

  "Venues": {
    meta: {
  _collectionId: '65dcae861710405f6e05b39d';
  slug: 'venues';
  displayName: 'Venues';
}

    Row: {
  logo?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  website?: string;
  testimonial?: string;
  'venue-manager'?: string;
  latitude?: string;
  longitude?: string;
  'address-text'?: string;
  'google-maps-link'?: string;
  name: string;
}

    refs: {
    };
    Relations: [];
  };

  "Event Tags": {
    meta: {
  _collectionId: '665879d8aa2dc8a86509bced';
  slug: 'event-tags';
  displayName: 'Event Tags';
}

    Row: {
  colour: string;
  name: string;
}

    refs: {
    };
    Relations: [];
  };

  "Links": {
    meta: {
  _collectionId: '667aad3b830456d71b2487c2';
  slug: 'links';
  displayName: 'Links';
}

    Row: {
  to: string;
  title: string;
  'meta-image': {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  'meta-description': string;
  name: string;
}

    refs: {
    };
    Relations: [];
  };

  "Agency - Recommended Artists": {
    meta: {
  _collectionId: '6758549e07324cd55606fc69';
  slug: 'agency-recommended-artists';
  displayName: 'Agency Recommended Artists';
}

    Row: {
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

    refs: {
    /** Reference to collection: 64d65811b2155c72fcc429d6 */
    'artist-link': WebflowCollections["Artists"]['Row'] | { _id: string; _reference: '64d65811b2155c72fcc429d6'; [k: string]: unknown; };
    };
    Relations: [
      {
        foreignCollection: "64d65811b2155c72fcc429d6",
        fieldName: "artist-link",
        isMultiple: false,
        isRequired: true,
      },
    ];
  };

  "Clients": {
    meta: {
  _collectionId: '675aea74e53a7089e6bbdd16';
  slug: 'clients';
  displayName: 'Clients';
}

    Row: {
  logo?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    [k: string]: unknown;
  };
  website?: string;
  testimonial?: string;
  'venue-manager'?: string;
  name: string;
}

    refs: {
    };
    Relations: [];
  };

  "Event Categories": {
    meta: {
  _collectionId: '675efaef79874b35a7d94136';
  slug: 'event-categories';
  displayName: 'Event Categories';
}

    Row: {
  colour: string;
  name: string;
}

    refs: {
    };
    Relations: [];
  };

}

export type Collection<T extends keyof WebflowCollections> = WebflowCollections[T]['Row'];
export type CollectionMeta<T extends keyof WebflowCollections> = WebflowCollections[T]['meta'];
export type CollectionRelations<T extends keyof WebflowCollections> = WebflowCollections[T]['Relations'];
export type CollectionRef<T extends keyof WebflowCollections, F extends keyof WebflowCollections[T]['refs']> = WebflowCollections[T]['refs'][F];

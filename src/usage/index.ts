/*
Example functions integrating a custom schema with the Webflow API
*/

import { createClient } from '@/main/webflow/client';
import { type ArtistsRow, ArtistsMeta } from './example/types/collections/artists';
import { validateEnv } from '@/main/env';
import { CollectionItemFieldData } from 'webflow-api/api';

// Create a type that combines Webflow's base type with our specific Artist type
type WebflowArtistFieldData = CollectionItemFieldData & ArtistsRow;

const env = validateEnv();
const webflow = await createClient(env.WEBFLOW_ACCESS_TOKEN);

// easily get the collection ID from the meta object for any collection
const collectionId = ArtistsMeta._collectionId;

// Create a new artist in Webflow CMS
async function createNewArtist(artist: ArtistsRow) {
  const response = await webflow.collections.items.createItem(
    collectionId,
    {
      fieldData: {
        ...artist,
        slug: 'john-doe',
      } as CollectionItemFieldData, // First cast to Webflow's expected type
    }
  );

  // Validate the response
  if (response?.fieldData === undefined) {
    throw new Error('Invalid artist data received from Webflow API');
  }

  return {
    id: response.id,
    // Now we can safely cast to our type since we've validated the shape
    fieldData: response.fieldData as WebflowArtistFieldData
  };
}

// Update an existing artist in Webflow CMS
async function updateExistingArtist(
  artistId: string, 
  payload: Partial<ArtistsRow>
) {
  const response = await webflow.collections.items.updateItem(
    collectionId,
    artistId,
    {
      fieldData: payload as CollectionItemFieldData,
    }
  );

  if (response?.fieldData === undefined) {
    throw new Error('Invalid artist data received from Webflow API');
  }

  return {
    id: response.id,
    fieldData: response.fieldData as WebflowArtistFieldData
  };
}

// --- Usage ---

// Define an ArtistRow, be helped with type hinting 
//which will warn you about required fields and show you the available fields
const MyArtist: ArtistsRow = {
  'artist-type': 'DJ / Producer',
  event: [],
  name: 'John Doe',
  'artist-type-broad': 'Musician',
  'artist-tags-2': [],
  'artist-bio-new': 'John Doe is a musician',
  'artist-image-pre-event': {
    url: 'https://example.com/image.jpg',
    alt: 'John Doe',
    width: 100,
    height: 100,
  },
  'link-tiktok': 'https://tiktok.com/john-doe',
  'link-twitter': 'https://twitter.com/john-doe',
  'instagram-link': 'https://instagram.com/john-doe',
  'youtube-link': 'https://youtube.com/john-doe',
  'spotify-link': 'https://spotify.com/john-doe',
  'soundcloud-link': 'https://soundcloud.com/john-doe',
  'website-link': 'https://john-doe.com',
  'optional-website-text': 'John Doe',
  'artist-s-testimony': 'Here is a testimony I have about Farrago',
  'hide-agency': false,
};

// Now these calls are properly typed
const newArtist = await createNewArtist(MyArtist);

console.log(newArtist);

const updatedArtist = await updateExistingArtist(
  newArtist.id!, 
  { 'instagram-link': 'https://instagram.com/john-doe-2' }
);

console.log(updatedArtist);

console.log(updatedArtist.fieldData.embedvideoid);

export { MyArtist };

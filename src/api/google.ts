import { GoogleSearchResult } from '../types/google';

const GOOGLE_API = import.meta.env.VITE_GOOGLE_API;
const ENGINE_ID = import.meta.env.VITE_ENGINE_ID;
const FIELDS = 'items(title,link,pagemap,snippet)';

async function search(query: string) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API}&cx=${ENGINE_ID}&q=${query}&fields=${FIELDS}`
    );
    const data: { items: GoogleSearchResult } = await response.json();
    return data.items;
  } catch (err) {
    console.log(err);
  }
}

export { search };

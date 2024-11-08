import axios from 'axios';

const SCRAPING_DATA_URL = process.env.NEXT_PUBLIC_SCRAPING_DATA_URL;

if (!SCRAPING_DATA_URL) {
  throw new Error("La variable de entorno 'NEXT_PUBLIC_SCRAPING_DATA_URL' no está definida.");
}

export const fetchScrapingData = async () => {
  try {
    const response = await axios.get(SCRAPING_DATA_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching scraping data:', error);
    return [];
  }
};

const BASE_URL = 'https://api.openbrewerydb.org/v1/breweries';

export const getBreweries = async () => {
  try {
    const response = await fetch(`${BASE_URL}?per_page=200`);
    if (!response.ok) {
      throw new Error('Failed to fetch breweries');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchBreweries = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search?query=${query}`);
    if (!response.ok) {
      throw new Error('Failed to search breweries');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

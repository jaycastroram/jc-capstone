const BASE_URL = 'https://api.openbrewerydb.org/v1/breweries';

export const getBreweries = async () => {
  const response = await fetch(`${BASE_URL}?per_page=200`);
  if (!response.ok) {
    throw new Error('Failed to fetch breweries');
  }
  return await response.json();
};

export const searchBreweries = async (query) => {
  const response = await fetch(`${BASE_URL}/search?query=${query}`);
  if (!response.ok) {
    throw new Error('Failed to search breweries');
  }
  return await response.json();
};

// New function to fetch a single brewery by ID
export const getBreweryById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch brewery');
  }
  return await response.json();
};

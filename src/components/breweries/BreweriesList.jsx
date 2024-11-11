import React, { useEffect, useState } from 'react';
import { getBreweries, searchBreweries } from '../../services/breweryService';
import { FaBeer, FaWarehouse, FaMicrochip, FaStar, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import './Breweries.css';

const getBreweryIcon = (type) => {
  switch (type) {
    case 'brewpub': return <FaBeer />;
    case 'micro': return <FaMicrochip />;
    case 'regional': return <FaWarehouse />;
    default: return <FaBeer />;
  }
};

const BreweriesList = () => {
  const [breweries, setBreweries] = useState([]);
  const [featuredBrewery, setFeaturedBrewery] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const data = await getBreweries();
        setBreweries(data);
        setFeaturedBrewery(data[Math.floor(Math.random() * data.length)]);
      } catch (error) {
        setError('Failed to load breweries');
      }
    };
    fetchBreweries();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const results = await searchBreweries(searchTerm);
      setBreweries(results);
    } catch (error) {
      setError('Failed to fetch search results');
    }
  };

  return (
    <div className="breweries-list">
      <h2>Breweries</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a brewery..."
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>

      {/* Featured Brewery */}
      {featuredBrewery && (
        <div className="featured-brewery">
          <h3>Featured Brewery</h3>
          <div className={`brewery-card ${featuredBrewery.brewery_type}`}>
            {getBreweryIcon(featuredBrewery.brewery_type)} {featuredBrewery.name}
            <p>{featuredBrewery.city}, {featuredBrewery.state_province}</p>
          </div>
        </div>
      )}

      {/* Brewery Cards */}
      <div className="brewery-cards-container">
        {error && <div className="error-message">{error}</div>}
        {breweries.map(brewery => (
          <div key={brewery.id} className={`brewery-card ${brewery.brewery_type}`}>
            <div className="brewery-card-inner">
              <div className="brewery-card-front">
                <h3>{getBreweryIcon(brewery.brewery_type)} {brewery.name}</h3>
                <p>Type: {brewery.brewery_type}</p>
                <p>Location: {brewery.city}, {brewery.state_province}</p>
                <div className="rating">
                  {[...Array(4)].map((_, i) => (
                    <FaStar key={i} color="#ffcc00" />
                  ))}
                </div>
              </div>
              <div className="brewery-card-back">
                <p>Address: {brewery.street}</p>
                <p>Phone: {brewery.phone}</p>
                {brewery.latitude && brewery.longitude && (
                  <a
                    href={`https://www.google.com/maps?q=${brewery.latitude},${brewery.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link"
                  >
                    <FaMapMarkerAlt /> View on Map
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreweriesList;

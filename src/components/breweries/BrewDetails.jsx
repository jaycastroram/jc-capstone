import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBreweryById } from '../../services/breweryService';
import { FaMapMarkerAlt, FaPhone, FaBeer } from "react-icons/fa";
import './Breweries.css';

const BrewDetails = ({ isLoggedIn }) => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrewery = async () => {
      try {
        const data = await getBreweryById(id);
        setBrewery(data);
      } catch (error) {
        setError('Failed to load brewery details');
      }
    };
    fetchBrewery();
  }, [id]);

  if (error) return <div className="error-message">{error}</div>;
  if (!brewery) return <p>Loading brewery details...</p>;

  return (
    <div className="brew-details">
      <div className="hero-section">
        <h2>{brewery.name}</h2>
      </div>

      <div className="info-grid">
        <div className="info-item"><FaMapMarkerAlt /> <p>{brewery.address_1}, {brewery.city}, {brewery.state_province}</p></div>
        <div className="info-item"><FaBeer /> <p>Type: {brewery.brewery_type}</p></div>
        <div className="info-item"><FaPhone /> <p>{brewery.phone}</p></div>
      </div>

      {/* Map Embed */}
      {brewery.latitude && brewery.longitude && (
        <div className="map-view">
          <iframe
            width="100%"
            height="300"
            src={`https://www.google.com/maps?q=${brewery.latitude},${brewery.longitude}&z=15&output=embed`}
            title="Map Location"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Website Button */}
      {brewery.website_url && (
        <a href={brewery.website_url} target="_blank" rel="noopener noreferrer" className="website-button">
          Visit Website
        </a>
      )}

      {/* Add to Checklist Button (only if logged in) */}
      {isLoggedIn && (
        <button className="add-checklist-button">
          Add to Checklist
        </button>
      )}
        <div>
      <Link to="/breweries"><button className="back-button">Back to Breweries List</button></Link>
      </div>
    </div>
  );
};

export default BrewDetails;








// This is for using google API key
// <div className="map-view">
//        <iframe
//          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBI-NPtvgEJJGEvK_iItBTleyJ_RQnGH_8&q=${brewery.latitude},${brewery.longitude}`}
//          title="Brewery Location"
//          width="100%"
//          height="300"
//          style={{ borderRadius: '8px' }}
//        ></iframe>
//      </div>
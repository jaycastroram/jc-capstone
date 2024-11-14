import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBreweryById } from '../../services/breweryService';
import { getBeerTypes, getUserChecklists, addToChecklist } from '../../services/checklistServices';
import { FaMapMarkerAlt, FaPhone, FaBeer } from "react-icons/fa";
import './Breweries.css';

const BrewDetails = ({ isLoggedIn }) => {
  const { id: breweryId } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [beerTypes, setBeerTypes] = useState([]);
  const [formData, setFormData] = useState({
    visitDate: '',
    personalRating: 1,
    favTypeBeer: '',
    recommended: false
  });
  const [alreadyInChecklist, setAlreadyInChecklist] = useState(false);

  useEffect(() => {
    // Fetch brewery details by ID
    const fetchBrewery = async () => {
      try {
        const data = await getBreweryById(breweryId);
        setBrewery(data);
      } catch (error) {
        setError('Failed to load brewery details');
      }
    };
    fetchBrewery();
  }, [breweryId]);

  useEffect(() => {
    // Fetch beer types for the dropdown menu
    getBeerTypes().then((types) => setBeerTypes(types));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // Fetch user's checklist to see if the item already exists
      const user = JSON.parse(localStorage.getItem("AleTrail_user"));
      if (user && user.id) {
        getUserChecklists(user.id)
          .then((checklists) => {
            const exists = checklists.some(item => item.breweryId === breweryId);
            setAlreadyInChecklist(exists);
          })
          .catch(error => console.error("Error checking checklist:", error));
      }
    }
  }, [breweryId, isLoggedIn]);

  const handleAddToChecklist = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Retrieve the logged-in user from local storage
    const user = JSON.parse(localStorage.getItem("AleTrail_user"));
    if (!user || !user.id) {
      alert("Please log in to add to the checklist.");
      return;
    }
  
    const checklistItem = {
      userId: user.id,
      breweryId: brewery.id,
      breweryName: brewery.name,
      location: `${brewery.city}, ${brewery.state_province}`,
      visitDate: formData.visitDate,
      personalRating: formData.personalRating,
      favTypeBeer: formData.favTypeBeer,
      recommended: formData.recommended,
    };
  
    addToChecklist(checklistItem)
      .then(() => {
        alert("Brewery added to your checklist!");
        setAlreadyInChecklist(true);  // Update state to hide the button
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Error adding brewery to checklist:", error);
        alert("Failed to add brewery to checklist");
      });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  if (error) return <div className="error-message">{error}</div>;
  if (!brewery) return <p>Loading brewery details...</p>;

  return (
    <div className="brew-details">
      <div className="hero-section">
        <h2>{brewery.name}</h2>
      </div>

      <div className="info-grid">
        <div className="info-item">
          <FaMapMarkerAlt /> <p>{brewery.address_1}, {brewery.city}, {brewery.state_province}</p>
        </div>
        <div className="info-item">
          <FaBeer /> <p>Type: {brewery.brewery_type}</p>
        </div>
        <div className="info-item">
          <FaPhone /> <p>{brewery.phone}</p>
        </div>
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

      {/* Add to Checklist Button (only if logged in and not already in checklist) */}
      {isLoggedIn && !alreadyInChecklist && !showForm && (
        <button onClick={handleAddToChecklist} className="add-checklist-button">
          Add to Checklist
        </button>
      )}

      {/* Checklist Form */}
      {showForm && (
        <form onSubmit={handleFormSubmit} className="checklist-form">
          <h3>Add to Checklist</h3>
          <div>
            <label>Visit Date:</label>
            <input
              type="date"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Personal Rating:</label>
            <input
              type="number"
              name="personalRating"
              min="1"
              max="5"
              value={formData.personalRating}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Favorite Beer Type:</label>
            <select
              name="favTypeBeer"
              value={formData.favTypeBeer}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a beer type</option>
              {beerTypes.map((type) => (
                <option key={type.typeId} value={type.typeId}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="recommended"
                checked={formData.recommended}
                onChange={handleInputChange}
              />
              Recommended
            </label>
          </div>
          <button type="submit" className="submit-checklist-button">Submit</button>
        </form>
      )}

      {/* Back Button */}
      <div>
        <Link to="/breweries">
          <button className="back-button">Back to Breweries List</button>
        </Link>
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
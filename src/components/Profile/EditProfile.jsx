// EditProfile.jsx
import React, { useState, useEffect } from 'react';
import './Profile.css';
import { getUserById, updateUser } from '../../services/userService';

const EditProfile = ({ userId, onUpdate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    favBrewery: '',
    profilePicture: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the current user data to pre-fill the form
    getUserById(userId)
      .then((data) => {
        setFormData({
          fullName: data.fullName,
          email: data.email,
          favBrewery: data.favBrewery,
          profilePicture: data.profilePicture
        });
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load user data");
        setLoading(false);
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    updateUser(userId, formData)
      .then(() => {
        alert("Profile updated successfully!");
        onUpdate(formData); // Update parent component's user state immediately
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to update profile");
        console.error("Error updating profile:", error);
        setLoading(false);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Favorite Brewery:
          <input
            type="text"
            name="favBrewery"
            value={formData.favBrewery}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Profile Picture URL:
          <input
            type="url"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className="save-btn" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button type="button" onClick={() => onUpdate(null)} className="cancel-btn">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfile;

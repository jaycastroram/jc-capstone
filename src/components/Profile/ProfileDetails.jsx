import React, { useState, useEffect } from 'react';
import EditProfile from './EditProfile';
import { getUserById } from '../../services/userService';

const ProfileDetails = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getUserById(userId)
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [userId]);

  const handleUpdate = (updatedData) => {
    if (updatedData) setUser(updatedData);
    setEditMode(false);
  };

  if (!user) return <p>Loading profile...</p>;

  return editMode ? (
    <EditProfile userId={userId} onUpdate={handleUpdate} />
  ) : (
    <div className="profile-details">
      <h2>Profile</h2>
      <div className="profile-info">
        {user.profilePicture ? (
          <img src={user.profilePicture} alt="Profile" className="profile-pic" />
        ) : (
          <button onClick={() => setEditMode(true)} className="add-pic-btn">
            Add Profile Picture
          </button>
        )}
        <div className="profile-text">
          <p><strong>Username:</strong> {user.userName}</p>
          <p><strong>Full Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Favorite Brewery:</strong> {user.favBrewery}</p>
        </div>
        <button onClick={() => setEditMode(true)} className="edit-profile-btn">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;


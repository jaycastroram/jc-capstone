import React, { useEffect, useState } from "react";
import { updateChecklistItem, removeChecklistItem, getUserChecklists } from "../../services/checklistServices";
import "./Checklist.css";

const Checklist = () => {
  const [checklists, setChecklists] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({
    visitDate: "",
    personalRating: "",
    recommended: false,
  });

  const user = JSON.parse(localStorage.getItem("AleTrail_user"));
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      getUserChecklists(userId)
        .then((data) => setChecklists(data))
        .catch((err) => console.error("Error fetching checklists:", err));
    }
  }, [userId]);

  const handleRemove = (id) => {
    removeChecklistItem(id)
      .then(() => setChecklists(checklists.filter((item) => item.id !== id)))
      .catch((err) => console.error("Error removing checklist item:", err));
  };

  const handleEdit = (item) => {
    setEditMode(item.id);
    setFormData({
      visitDate: item.visitDate,
      personalRating: item.personalRating,
      recommended: item.recommended,
    });
  };

  const handleUpdateSubmit = (id) => {
    updateChecklistItem(id, formData)
      .then(() => {
        setChecklists(checklists.map((item) => (item.id === id ? { ...item, ...formData } : item)));
        setEditMode(null);
      })
      .catch((err) => console.error("Error updating checklist item:", err));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="user-checklist">
      <h2>My Brewery Checklist</h2>
      {checklists.map((item) => (
        <div key={item.id} className="checklist-item">
        <div className="checklist-card-inner">
          {/* Front of the card */}
          <div className="checklist-card-front">
            <p className="checklist-name">{item.breweryName}</p>
            <p className="checklist-details">Visit Date: {item.visitDate}</p>
            <p className="checklist-details">Rating: {item.personalRating}</p>
            <p className="checklist-details">
              Recommended: <span className={item.recommended ? "recommended" : "not-recommended"}>{item.recommended ? "Yes" : "No"}</span>
            </p>
          </div>
      
          {/* Back of the card */}
          <div className="checklist-card-back">
            {editMode === item.id ? (
              <form onSubmit={() => handleUpdateSubmit(item.id)} className="edit-form">
                <input type="date" name="visitDate" value={formData.visitDate} onChange={handleInputChange} className="edit-input" />
                <input type="number" name="personalRating" value={formData.personalRating} onChange={handleInputChange} className="edit-input" />
                <label className="edit-label">
                  Recommended:
                  <input type="checkbox" name="recommended" checked={formData.recommended} onChange={handleInputChange} className="edit-checkbox" />
                </label>
                <button type="submit" className="update-btn">Update</button>
                <button type="button" onClick={() => setEditMode(null)} className="cancel-btn">Cancel</button>
              </form>
            ) : (
              <>
                <button onClick={() => handleEdit(item)} className="edit-btn">Edit</button>
                <button onClick={() => handleRemove(item.id)} className="remove-btn">Remove</button>
              </>
            )}
          </div>
        </div>
      </div>
      
      ))}
    </div>
  );
};

export default Checklist;

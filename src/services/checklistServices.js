export const getBeerTypes = () => {
  return fetch("http://localhost:8088/beerTypes")
    .then((response) => response.json());
};

export const addToUserChecklist = async (userChecklistData) => {
  const response = await fetch("http://localhost:8088/userChecklists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userChecklistData)
  });
  
  if (!response.ok) throw new Error("Failed to link user to checklist");
  
  return await response.json(); 
};

const BASE_URL = "http://localhost:8088"; 

export const addToChecklist = async (checklistItem) => {
  try {
    const response = await fetch(`${BASE_URL}/checklists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checklistItem),
    });
    if (!response.ok) throw new Error("Failed to add checklist item");
    return await response.json();
  } catch (error) {
    console.error("Error adding to checklist:", error);
    throw error;
  }
};

const API_URL = "http://localhost:8088";


export const getUserChecklists = async (userId) => {
  const response = await fetch(`${API_URL}/checklists?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user's checklists");
  }
  return response.json();
};


// checklistServices.js

// Function to update a checklist item
export const updateChecklistItem = (id, updatedData) => {
  return fetch(`http://localhost:8088/checklists/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to update checklist item");
      return response.json();
    })
    .catch((error) => {
      console.error("Error in updateChecklistItem:", error);
      throw error;
    });
};

// Function to remove a checklist item
export const removeChecklistItem = (id) => {
  return fetch(`http://localhost:8088/checklists/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to delete checklist item");
    })
    .catch((error) => {
      console.error("Error in removeChecklistItem:", error);
      throw error;
    });
};


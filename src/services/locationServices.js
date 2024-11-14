// src/services/locationService.js

export const getStates = async () => {
    try {
      const response = await fetch("http://localhost:8088/states"); // Replace with your server's states endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch states");
      }
      const states = await response.json();
      return states;
    } catch (error) {
      console.error("Error fetching states:", error);
      throw error;
    }
  };
  
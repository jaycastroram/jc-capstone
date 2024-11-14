const USERS_KEY = "AleTrail_users";
const getAllUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};


export const createUser = async (user) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  
  const newUserId = users.length > 0 ? users[users.length - 1].userId + 1 : 1;
  const newChecklistId = newUserId; 
  
  const newUser = { ...user, userId: newUserId, checklistId: newChecklistId };
  users.push(newUser);
  
  localStorage.setItem("users", JSON.stringify(users));
  
  return newUser;
};

export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`)
    .then((response) => response.json())
    .then((users) => users.length > 0 ? users[0] : null)
    .catch((error) => {
      console.error("Error fetching user by email:", error);
      throw error;
    });
};

export const getUserById = (userId) => {
  return fetch(`http://localhost:8088/users?id=${userId}`)
    .then((response) => response.json())
    .then((data) => data[0]); 
};

export const updateUser = (userId, updatedData) => {
  return fetch(`http://localhost:8088/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedData)
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    return response.json();
  });
};

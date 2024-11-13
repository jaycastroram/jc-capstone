const USERS_KEY = "AleTrail_users";

// Get all users from localStorage
const getAllUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

export const createUser = (user) => {
  return fetch("http://localhost:8088/users")
    .then((response) => response.json())
    .then((users) => {
      // Determine the next numeric ID by finding the highest `userId` and adding 1
      const nextUserId = users.length > 0 ? Math.max(...users.map(u => u.userId)) + 1 : 1;

      // Create a new user object with the incremented `userId`
      const newUser = { ...user, userId: nextUserId };

      // POST the new user to the database
      return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }).then((response) => response.json());
    })
    .catch((error) => {
      console.error("Error creating user:", error);
      throw error;
    });
};



export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`)
    .then((response) => response.json())
    .then((users) => users.length > 0 ? users[0] : null) // Return the first user if found, otherwise null
    .catch((error) => {
      console.error("Error fetching user by email:", error);
      throw error;
    });
};


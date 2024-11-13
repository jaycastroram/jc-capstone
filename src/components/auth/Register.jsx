import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { createUser, getUserByEmail } from "../../services/userService";

export const Register = (props) => {
  const [customer, setCustomer] = useState({
    email: "",
    fullName: "",
    userName: "",
    password: "",
    state: "",
    profilePicture: "",
    isLoggedIn: false,
  });

  const navigate = useNavigate();

  const registerNewUser = () => {
    createUser(customer).then((createdUser) => {
      console.log("Created user:", createdUser); // Debugging output
      if (createdUser && createdUser.hasOwnProperty("userId")) {
        localStorage.setItem(
          "AleTrail_user",
          JSON.stringify({
            id: createdUser.userId,
            isLoggedIn: true,
          })
        );
        setCustomer({
          email: "",
          fullName: "",
          userName: "",
          password: "",
          state: "",
          profilePicture: "",
          isLoggedIn: true,
        });
        navigate("/");
      } else {
        console.error("User creation failed."); // Error handling
      }
    }).catch((error) => {
      console.error("Error during registration:", error); // Additional error handling
    });
  };
  

  const handleRegister = (e) => {
    e.preventDefault();
  
    getUserByEmail(customer.email).then((response) => {
      if (response) { // If a user is found, show an alert
        window.alert("Account with that email address already exists");
      } else {
        registerNewUser(); // No user found, proceed with registration
      }
    }).catch((error) => {
      console.error("Error checking email existence:", error);
    });
  };
  

  const updateCustomer = (evt) => {
    const copy = { ...customer };
    const { id, value, files } = evt.target;
    if (id === "profilePicture" && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        copy[id] = reader.result; // Save image as a base64 string
        setCustomer(copy);
      };
      reader.readAsDataURL(files[0]);
    } else {
      copy[id] = value;
      setCustomer(copy);
    }
  };

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1>Ale Trail</h1>
        <h2>Please Register</h2>

        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="fullName"
              className="form-control"
              placeholder="Enter your full name"
              required
              autoFocus
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="userName"
              className="form-control"
              placeholder="Choose a username"
              required
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="password"
              id="password"
              className="form-control"
              placeholder="Create a password"
              required
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <select
              onChange={updateCustomer}
              id="state"
              className="form-control"
              required
            >
              <option value="">Select your state</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
              {/* Add more states as needed */}
            </select>
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="profilePicture">Upload Profile Picture:</label>
            <input
              onChange={updateCustomer}
              type="file"
              id="profilePicture"
              className="form-control"
              accept="image/*"
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <button className="login-btn btn-info" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>

      <section>
        <Link to="/login">Already a member? Sign in</Link>
      </section>
    </main>
  );
};

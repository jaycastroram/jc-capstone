import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { createUser, getUserByEmail } from "../../services/userService";
import { getStates } from "../../services/locationServices";

export const Register = (props) => {
  const [customer, setCustomer] = useState({
    email: "",
    fullName: "",
    userName: "",
    password: "",
    stateID: "",  // Updated to stateID to match the new structure
    profilePicture: "",
    
    isLoggedIn: false,
  });
  const [states, setStates] = useState([]); // Holds states list
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch states from service and set them in state
    getStates().then(setStates).catch((error) => {
      console.error("Failed to fetch states:", error);
    });
  }, []);

  const registerNewUser = () => {
    createUser(customer)
      .then((createdUser) => {
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
            stateID: "",
            profilePicture: "",
            isLoggedIn: true,
          });
          navigate("/");
        } else {
          console.error("User creation failed.");
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(customer.email)
      .then((response) => {
        if (response) {
          window.alert("Account with that email address already exists");
        } else {
          registerNewUser();
        }
      })
      .catch((error) => {
        console.error("Error checking email existence:", error);
      });
  };

  const updateCustomer = (evt) => {
    const copy = { ...customer };
    const { id, value, files } = evt.target;
    if (id === "profilePicture" && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        copy[id] = reader.result;
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
            <label htmlFor="state">Select your state:</label>
            <select
              onChange={updateCustomer}
              id="stateID"
              className="form-control"
              required
              value={customer.stateID}
            >
              <option value="">Select your state</option>
              {states.map((state) => (
                <option key={state.stateId} value={state.stateId}>
                  {state.name}
                </option>
              ))}
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

        <section>
          <Link to="/login">Already a member? Sign in</Link>
        </section>
      </form>
    </main>
  );
};

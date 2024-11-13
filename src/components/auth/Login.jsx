import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByEmail } from "../../services/userService";

export const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
// if (!email || !password) {
    //   window.alert("Please enter both email and password.");
    //   return;
    // }
    const handleLogin = (e) => {
      e.preventDefault();
    
      getUserByEmail(email).then((user) => {
        if (user && user.password === password) {
          localStorage.setItem(
            "AleTrail_user",
            JSON.stringify({
              id: user.id,
              isLoggedIn: true,
            })
          );
          setIsLoggedIn(true); // Set logged-in state to true
          navigate("/");
        } else {
          window.alert("Invalid login credentials");
        }
      }).catch((error) => {
        console.error("Error during login:", error);
      });
    };
    

  return (
    <main className="container-login">
      <section>
        <form className="form-login" onSubmit={handleLogin}>
          <h1>Ale Trail</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn btn-info" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </section>
      <section>
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};

import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleSignin } from "../../features/auth/authSlice";
import "./Auth.css";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    try {
      const res = await dispatch(handleSignin({ email, password }));
      if (handleSignin.rejected.match(res)) {
        // Handle rejected action (error occurred)
        window.alert(`Error! ${res.payload}`);
      } else {
        // Request was successful
        navigate("/");
      }
    } catch (error) {
      window.alert(error.message);
      console.error("Error during signin:", error.message);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="d-flex jc-center container h-100"
      style={{ alignItems: "center" }}
    >
      <div className="auth-card">
        <form onSubmit={handleSubmit} method="POST">
          <div className="logo">
            <img src="/src/assets/logo.svg" alt="logo" />
            <h1>Influx</h1>
          </div>

          <h2>Login</h2>
          <hr className="hr" />
          <label htmlFor="email" className="input-label">
            Email
          </label>
          <input
            type="text"
            name="email"
            className="input-value"
            placeholder="user@gmail.com"
            onChange={handleChange}
            required
          />
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="input-value mb-2"
            placeholder="password"
            onChange={handleChange}
            required
          />

          <div className="d-flex jc-center mb-2">
            <Button variant="contained" type="submit" className="btn">
              Sign in
            </Button>
          </div>

          <hr className="hr" />
          <Link to="/signup" className="link">
            <h3 className="highlight blue">Create Account ?</h3>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signin;

import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Signin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    const res = await fetch("http://localhost:5001/user/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const response = await res.json();
    if (response.status === 200) {
      window.alert("registration succesfull");
      console.log(response);
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
          <h3 className="highlight">
            <Link to="/signup">Create Account ?</Link>
          </h3>
        </form>
      </div>
    </div>
  );
};

export default Signin;

import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { PORT } from "../../utils/config";
import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, dob, email, password } = user;

    try {
      const response = await axios.post(
        `${PORT}/user/signup`,
        {
          name,
          dob,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );

      if (response.status === 200) {
        navigate("/signin", { state: { email: email } });
      }
    } catch (error) {
      window.alert("User with this email already exists");
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
        <form method="POST" onSubmit={handleSubmit}>
          <div className="logo">
            <img src="/src/assets/logo.svg" alt="logo" />
            <h1>Influx</h1>
          </div>
          <h2>Create Account</h2>
          <hr className="hr" />

          <label htmlFor="name" className="input-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="input-value"
            placeholder="John Doe"
            onChange={handleChange}
          />
          <label htmlFor="dob" className="input-label">
            Date Of Birth
          </label>
          <input
            type="date"
            name="dob"
            className="input-value"
            placeholder="user@gmail.com"
            onChange={handleChange}
          />
          <label htmlFor="email" className="input-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="input-value"
            placeholder="John@gmail.com"
            onChange={handleChange}
          />
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="input-value mb-2"
            placeholder="Password"
            onChange={handleChange}
          />

          <div className="d-flex jc-center mb-2">
            <Button variant="contained" type="submit" className="btn">
              Create
            </Button>
          </div>
          <hr />
          <h5 className="highlight mt-2">
            Already have an account?{" "}
            <Link to="/signin">
              <span className="blue">Login</span>
            </Link>
          </h5>
        </form>
      </div>
    </div>
  );
};

export default Signup;

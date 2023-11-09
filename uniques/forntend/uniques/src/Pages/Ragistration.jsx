import axios from "axios";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";

function Registration() {
  const [res, setres] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      var res = await axios.post("http://localhost:8080/user/create", formData);
      setres(res.data);
    } catch (err) {
      if (err.response) {
        // Set the error response to the state
        setres(err.response.data);
      } else if (err.request) {
        // The request was made but no response was received
        console.log("Error Request Data:", err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error Message:", err.message);
      }
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1 className="text-center mb-4">Create Account</h1>
        <form onSubmit={formHandler} className="col-md-6 offset-md-3">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={inputHandler}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={inputHandler}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={inputHandler}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
        <h2>{res}</h2>
      </div>
    </>
  );
}

export default Registration;

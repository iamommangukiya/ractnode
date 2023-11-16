import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  var [res, setres] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const auth = async () => {
    window.open(`http://localhost:8080/auth/google/callback`, "_self");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var res = await axios.post("http://localhost:8080/user/login", formData);
      setres(res.data);
    } catch (err) {
      if (err.response) {
        setres(err.response.data);
      } else if (err.request) {
        console.log("Error Request Data:", err.request);
      } else {
        console.log("Error Message:", err.message);
      }
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="block">
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <button type="button" className="btn btn-primary" onClick={auth}>
              Login with google
            </button>
            <h2>{res}</h2>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

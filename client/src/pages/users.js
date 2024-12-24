import React, { useState } from "react";
import { Signup } from "../API/Users";

const Users = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setMessage("Please fill all required fields!");
      setTimeout(function () {
        setMessage("");
      }, 3000);
    } else {
      if (formData.password !== formData.confirmPassword) {
        setMessage("Password and confirm password are different!");
        setTimeout(function () {
          setMessage("");
        }, 3000);
      } else {
        Signup(formData).then((res) => {
          setMessage(res.data.msg);
          setTimeout(function () {
            setMessage("");
          }, 3000);
        });
      }
    }
  };

  return (
    <div className="signup">
      <form className="signup-content">
        <h2 className="signup-text">Sign Up</h2>

        <label className="label">First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="input"
          required
        />

        <label className="label">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="input"
          required
        />

        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input"
          placeholder="you@example.com"
          required
        />

        <label className="label">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="input"
          required
        />

        <label className="label">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="input"
          required
        />

        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="input"
          placeholder="Enter your password"
          required
        />

        <label className="label">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="input"
          placeholder="Confirm your password"
          required
        />

        <button onClick={handleSubmit} type="submit" className="signup-button">
          Sign Up
        </button>

        
        <div className="message-container">
            {message && (          
                <p className="message">{message}</p>          
            )}
        </div>

        <div className="already-have-account">
          <p>
            Already have an account? <a href="/login">Signin</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Users;

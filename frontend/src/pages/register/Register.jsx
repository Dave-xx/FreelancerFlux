import React from "react";
import "./Register.scss";
import { useState } from "react";
import upload from "../../utils/upload";
import newRequest from "./../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);

    try {
      await newRequest.post("auth/register", { ...user, img: url });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="left">
            <h1>Create a new account</h1>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Someone"
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Someone@gmail.com"
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="My Password"
              onChange={handleChange}
            />
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              type="file"
              name="profilePicture"
              id="profilePicture"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              placeholder="USA"
              onChange={handleChange}
            />

            <button type="submit">Register</button>
          </div>
          <div className="right">
            <h1>I want to become a seller</h1>
            <div className="toggle">
              <label htmlFor="switchSeller">Activate the seller account</label>
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={handleSeller}
                  id="switchSeller"
                />
                <span className="slider round"></span>
              </label>
            </div>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="+1 202 555 0125"
            />
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              id="desc"
              cols="30"
              rows="10"
              onChange={handleChange}></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

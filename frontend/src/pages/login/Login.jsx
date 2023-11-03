import React, { useEffect, useState } from "react";
import "./Login.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "./../../utils/newRequest";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post(
        "/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Someone"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          placeholder="My Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <span style={{ color: "#B00020", fontSize: "14px" }}>
          {error && error}
        </span>
        <p>
          Don&apos;t have an account yet?{"  "}
          <Link to="/register" className="link" style={{ color: "blue" }}>
            Register now
          </Link>
        </p>{" "}
      </form>
    </div>
  );
};

export default Login;

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { LoginContext } from "./App";

const AdminApp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Perform login logic, e.g., send login request to the server
      const response = await axios.post("http://localhost:5001/admin/login", {
        username: username,
        password: password,
      });
      console.log(response.data.message);

      // Assuming the server responds with a token or success status
      if (response.data.message === "Login successful") {
        // Set isLoggedIn to true from the App component's context
        setIsLoggedIn(true);
        console.log(isLoggedIn);
        // Redirect to the desired page after successful login
        navigate("/users");
      } else {
        // Handle login failure, e.g., display an error message
        alert("Login failed");
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  return (
    <div>
      <h1>Park Spot Admin</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminApp;

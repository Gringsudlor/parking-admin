import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./App";
import Header from "./Header";
import axios from "axios";
import api from "./api";

const UserCreate = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

  const handleCreateClick = async () => {
    const response = await axios.post(api.backend_URL + "/create/users", {
      uname: username,
      email: email,
      password: password,
    });
    alert(response.data.message);
  };

  const handleBackClick = () => {
    // Navigate to the pin page
    navigate("/users");
  };

  return (
    <div>
      <Header />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleCreateClick}>Create</button>
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default UserCreate;

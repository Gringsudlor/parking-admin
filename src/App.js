import React, { useContext, useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import AdminApp from "./Admin";
import Users from "./Users";
import Pins from "./Pins";
import UserCreate from "./UserCreate";
import PinCreate from "./PinCreate";

// Create a LoginContext
export const LoginContext = createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Routes>
          <Route path="/" element={<AdminApp />} />
          <Route path="/users" element={<Users />} />
          <Route path="/pins" element={<Pins />} />
          <Route path="/users/create" element={<UserCreate />} />
          <Route path="/pins/create" element={<PinCreate />} />
        </Routes>
      </LoginContext.Provider>
    </Router>
  );
};

export default App;

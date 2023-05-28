import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { LoginContext } from "./App";

const Header = () => {
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const handleUserClick = () => {
    // Navigate to the user page
    navigate("/users");
  };

  const handlePinClick = () => {
    // Navigate to the pin page
    navigate("/pins");
  };

  const handleLogoutClick = () => {
    // Navigate to the pin page
    navigate("/");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <h1 onClick={handleLogoutClick}>Park Spot Admin</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>
              <button className="admin-button" onClick={handleUserClick}>
                USER
              </button>
            </th>
            <th>
              <button className="admin-button" onClick={handlePinClick}>
                PIN
              </button>
            </th>
            <th>
              <button className="admin-button" onClick={handleLogoutClick}>
                LOGOUT
              </button>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default Header;

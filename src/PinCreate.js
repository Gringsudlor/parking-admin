import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./App";
import Header from "./Header";
import axios from "axios";
import api from "./api";

const PinCreate = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [fullslot, setFullslot] = useState("");

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };
  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };
  const handleFullslotChange = (e) => {
    setFullslot(e.target.value);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

  const handleCreateClick = async () => {
    const response = await axios.post(api.backend_URL + "/create/pins", {
      sym: symbol,
      pname: name,
      lati: latitude,
      longi: longitude,
      img: "",
      fullSlots: fullslot,
    });
    alert(response.data.message);
  };

  const handleBackClick = () => {
    // Navigate to the pin page
    navigate("/pins");
  };

  return (
    <div>
      <Header />
      <input
        type="text"
        placeholder="Symbol"
        value={symbol}
        onChange={handleSymbolChange}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder="Latitude"
        value={latitude}
        onChange={handleLatitudeChange}
      />
      <input
        type="text"
        placeholder="Longitude"
        value={longitude}
        onChange={handleLongitudeChange}
      />
      <input
        type="text"
        placeholder="Full slots"
        value={fullslot}
        onChange={handleFullslotChange}
      />
      <button onClick={handleCreateClick}>Create</button>
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default PinCreate;

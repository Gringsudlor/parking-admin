import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { LoginContext } from "./App";
import Header from "./Header";
import api from "./api";

const Pins = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState({});
  const [nametxt, setNametxt] = useState("");
  const [latitude, setLatitude] = useState({});
  const [latitudetxt, setLatitudetxt] = useState("");
  const [longitude, setLongitude] = useState({});
  const [longitudetxt, setLongitudetxt] = useState("");
  const [fullslot, setFullslot] = useState({});
  const [fullslottxt, setFullslottxt] = useState("");
  const [car, setCar] = useState({});
  const [cartxt, setCartxt] = useState("");
  const [image, setImage] = useState({});
  const [imagetxt, setImagetxt] = useState("");
  const [camfeed, setCamfeed] = useState({});
  const [camfeedtxt, setCamfeedtxt] = useState("");
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const handleNameClick = (name) => {
    setName(name);
  };

  const handleNameChange = (e) => {
    setNametxt(e.target.value);
  };

  const handleCloseName = () => {
    setName({});
  };

  const handleLatitudeClick = (name) => {
    setLatitude(name);
  };

  const handleLatitudeChange = (e) => {
    setLatitudetxt(e.target.value);
  };

  const handleCloseLatitude = () => {
    setLatitude({});
  };

  const handleLongitudeClick = (name) => {
    setLongitude(name);
  };

  const handleLongitudeChange = (e) => {
    setLongitudetxt(e.target.value);
  };

  const handleCloseLongitude = () => {
    setLongitude({});
  };

  const handleFullslotClick = (name) => {
    setFullslot(name);
  };

  const handleFullslotChange = (e) => {
    setFullslottxt(e.target.value);
  };

  const handleCloseFullslot = () => {
    setFullslot({});
  };

  const handleCarClick = (name) => {
    setCar(name);
  };

  const handleCarChange = (e) => {
    setCartxt(e.target.value);
  };

  const handleCloseCar = () => {
    setCar({});
  };

  const handleImageClick = (name) => {
    setImage(name);
  };

  const handleImageChange = (e) => {
    setImagetxt(e.target.value);
  };

  const handleCloseImage = () => {
    setImage({});
  };

  const handleCamfeedClick = (name) => {
    setCamfeed(name);
  };

  const handleCamfeedChange = (e) => {
    setCamfeedtxt(e.target.value);
  };

  const handleCloseCamfeed = () => {
    setCamfeed({});
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/pins"); // Replace with your backend API URL
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCreateClick = () => {
    // Navigate to the pin page
    navigate("/pins/create");
  };

  const handleDeleteClick = async (symbol) => {
    const response = await axios.delete(
      api.backend_URL + "/delete/pins/" + symbol
    );
    alert(response.data.message);
  };

  const postName = async (symbol) => {
    const response = await axios.patch(
      api.backend_URL + "/update/pins/name/" + symbol
    );
    alert(response.data.message);
    fetchData();
  };

  const postLatitude = async (symbol) => {
    const response = await axios.patch(
      api.backend_URL + "/update/pins/latitude/" + symbol
    );
    alert(response.data.message);
    fetchData();
  };

  const postLongitude = async (symbol) => {
    const response = await axios.patch(
      api.backend_URL + "/update/pins/longitude/" + symbol
    );
    alert(response.data.message);
    fetchData();
  };

  const postFullSlot = async (symbol) => {
    const response = await axios.patch(
      api.backend_URL + "/update/pins/fullslots/" + symbol
    );
    alert(response.data.message);
    fetchData();
  };

  const postCar = async (symbol) => {
    const response = await axios.patch(
      api.backend_URL + "/update/pins/cars/" + symbol
    );
    alert(response.data.message);
    fetchData();
  };

  const postImage = async (symbol) => {
    const response = await axios.patch(
      api.backend_URL + "/update/pins/image/" + symbol
    );
    alert(response.data.message);
    fetchData();
  };

  const postCamfeed = async (symbol) => {
    const response = await axios.patch(
      api.backend_URL + "/update/pins/camfeed/" + symbol
    );
    alert(response.data.message);
    fetchData();
  };

  return (
    <div>
      <Header />
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Symbol</th>
            <th>Location Name</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>FullSlots</th>
            <th>Number of Cars</th>
            <th>ImageURL</th>
            <th>CamFeedURL</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.symbol}</td>
              <td onClick={() => handleNameClick(item)}>{item.name}</td>
              <td onClick={() => handleLatitudeClick(item)}>{item.latitude}</td>
              <td onClick={() => handleLongitudeClick(item)}>
                {item.longitude}
              </td>
              <td onClick={() => handleFullslotClick(item)}>
                {item.fullSlots}
              </td>
              <td onClick={() => handleCarClick(item)}>{item.cars}</td>
              <td onClick={() => handleImageClick(item)}>{item.image}</td>
              <td onClick={() => handleCamfeedClick(item)}>{item.camfeed}</td>
              <td>
                <button onClick={() => handleDeleteClick(item.symbol)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCreateClick}>Create</button>
      {Object.keys(name).length !== 0 && (
        <div className="popup">
          <div className="popup-content">
            <h3>{name.name}</h3>
            <input
              type="text"
              placeholder="Name"
              value={nametxt}
              onChange={handleNameChange}
            />
            <button onClick={() => postName(name.symbol)}>Update</button>
            <button onClick={handleCloseName}>Close</button>
          </div>
        </div>
      )}
      {Object.keys(latitude).length !== 0 && (
        <div className="popup">
          <div className="popup-content">
            <h3>{latitude.name}</h3>
            <input
              type="text"
              placeholder="Latitude"
              value={latitudetxt}
              onChange={handleLatitudeChange}
            />
            <button onClick={() => postLatitude(latitude.symbol)}>
              Update
            </button>
            <button onClick={handleCloseLatitude}>Close</button>
          </div>
        </div>
      )}
      {Object.keys(longitude).length !== 0 && (
        <div className="popup">
          <div className="popup-content">
            <h3>{longitude.name}</h3>
            <input
              type="text"
              placeholder="Longtitude"
              value={longitudetxt}
              onChange={handleLongitudeChange}
            />
            <button onClick={() => postLongitude(longitude.symbol)}>
              Update
            </button>
            <button onClick={handleCloseLongitude}>Close</button>
          </div>
        </div>
      )}
      {Object.keys(fullslot).length !== 0 && (
        <div className="popup">
          <div className="popup-content">
            <h3>{fullslot.name}</h3>
            <input
              type="text"
              placeholder="Fullslot"
              value={fullslottxt}
              onChange={handleFullslotChange}
            />
            <button onClick={() => postFullSlot(fullslot.symbol)}>
              Update
            </button>
            <button onClick={handleCloseFullslot}>Close</button>
          </div>
        </div>
      )}
      {Object.keys(car).length !== 0 && (
        <div className="popup">
          <div className="popup-content">
            <h3>{car.name}</h3>
            <input
              type="text"
              placeholder="Car"
              value={cartxt}
              onChange={handleCarChange}
            />
            <button onClick={() => postCar(car.symbol)}>Update</button>
            <button onClick={handleCloseCar}>Close</button>
          </div>
        </div>
      )}
      {Object.keys(image).length !== 0 && (
        <div className="popup">
          <div className="popup-content">
            <h3>{image.name}</h3>
            <input
              type="text"
              placeholder="Image"
              value={imagetxt}
              onChange={handleImageChange}
            />
            <button onClick={() => postImage(image.symbol)}>Update</button>
            <button onClick={handleCloseImage}>Close</button>
          </div>
        </div>
      )}
      {Object.keys(camfeed).length !== 0 && (
        <div className="popup">
          <div className="popup-content">
            <h3>{camfeed.name}</h3>
            <input
              type="text"
              placeholder="Camfeed"
              value={camfeedtxt}
              onChange={handleCamfeedChange}
            />
            <button onClick={() => postCamfeed(camfeed.symbol)}>Update</button>
            <button onClick={handleCloseCamfeed}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pins;

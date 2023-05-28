import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { LoginContext } from "./App";
import Header from "./Header";
import api from "./api";

const Users = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [img, setImg] = useState({});
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const [username, setUsername] = useState("");

  const handleUsernameClick = (user) => {
    setUser(user);
  };
  const handleImgClick = (img) => {
    setImg(img);
  };

  const handleClosePopup = () => {
    setUser({});
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const postUsername = async (email) => {
    try {
      const response = await axios.patch(
        api.backend_URL + "/update/users/username/" + email,
        { newUsername: username }
      );
      console.log("Username updated successfully");
      // You can add further logic or display a success message
    } catch (error) {
      console.error("Error updating username:", error);
    }
    fetchData();
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(api.backend_URL + "/users");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const uploadImagesToBlobStorage = async () => {
    try {
      const formData = new FormData();
      images.forEach((image) => formData.append("image", image));

      const response = await axios.post(
        api.backend_URL + "/uploadimg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-filename": "profile.jpg", // Specify the desired blob name here
          },
        }
      );
      await axios.patch(api.backend_URL + "/update/image/" + img.email, {
        img: response.data.imageUrl,
      });
      console.log(response.data.imageUrl);
      console.log("Image uploaded successfully");
      // You can add further logic or display a success message
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    fetchData();
  };

  const handleCreateClick = () => {
    // Navigate to the pin page
    navigate("/users/create");
  };

  const handleDeleteClick = async (email) => {
    const response = await axios.delete(
      api.backend_URL + "/delete/users/" + email
    );
    alert(response.data.message);
  };

  return (
    <div>
      <Header />
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Saved Pin</th>
            <th>ImageURL</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td onClick={() => handleUsernameClick(item)}>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.favorite}</td>
              <td onClick={() => handleImgClick(item)}>{item.image}</td>
              <td>
                <button onClick={() => handleDeleteClick(item.email)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCreateClick}>Create</button>
      {Object.keys(user).length !== 0 && (
        <div className="popup">
          <div className="popup-content">
            <h3>{user.username}</h3>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
            <button onClick={() => postUsername(user.email)}>Update</button>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
      {Object.keys(img).length !== 0 && (
        <div className="popup">
          <div className="popup-content">
            <h3>{img.username}</h3>
            <input
              type="file"
              multiple
              accept="image/*"
              placeholder="Username"
              value={username}
              onChange={onImageChange}
            />
            {imageURLs.map((imageSrc) => (
              <img
                width="240"
                height="180 "
                src={imageSrc}
                key={imageSrc}
                alt="Uploaded"
              />
            ))}
            <button onClick={uploadImagesToBlobStorage}>Upload Image</button>
            <button
              onClick={() => {
                setImg([]);
                setImages([]);
                setImageURLs([]);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;

import React, { useState, useEffect, useRef } from "react";
import { Label, Table, Form } from "reactstrap";
import axios from "axios";
import "../styles/components/profile.scss";
import EditProfile from "./editProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import "animate.css";
export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const getAge = (dateUser) => {
    let dateNow = new Date();
    let user = new Date(dateUser);
    var age = dateNow.getTime() - user.getTime();
    return Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));
  };
  const birthday = (userData) => {
    let user = new Date(userData);
    let day = user.getUTCDate();
    let month = user.getMonth() + 1;
    let year = user.getUTCFullYear();
    return day + "." + month + "." + year;
  };
  const fileInputRef = useRef();

  const handleChange = (event) => {
    // do something with event data
  };
  function Profile() {
    return (
      <div className="profile-container animate__animated animate__fadeInLeftBig">
        <div className="image-container">
          <div className="image">
            <div>
              <img src={`${user.image}`} alt="person image"></img>
            </div>
            <div>
              <React.Fragment>
                <input
                  onChange={handleChange}
                  multiple={false}
                  ref={fileInputRef}
                  type="file"
                  hidden
                />
                <button
                  className="image-edit-button"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FontAwesomeIcon
                    className="fa-button-icon"
                    icon={faEdit}
                  ></FontAwesomeIcon>
                  Edit Image
                </button>
              </React.Fragment>
              {/* <button type="upload" className="image-edit-button">
            Edit Image
          </button> */}
            </div>
          </div>
          <div className="info-container">
            <Table className="info-table">
              <tr>
                <Label className="name-label">
                  {user.name + " " + user.surname}
                </Label>
              </tr>
              <tr>
                <Label className="left-label">Gender:</Label>
                <Label className="right-label">{user.gender}</Label>
              </tr>
              <tr>
                <Label className="left-label">Age:</Label>
                <Label className="right-label">{getAge(user.birthday)}</Label>
              </tr>
            </Table>
          </div>
        </div>
        <div className="user-container">
          <div className="user-container-title">
            <Label className="title">Profile</Label>
          </div>
          <div className="user-container-form">
            <Form className="user-form">
              <Table className="user-table">
                <tr>
                  <Label className="left-label">Name:</Label>
                  <Label className="right-label">{user.name}</Label>
                </tr>
                <tr>
                  <Label className="left-label">Surname:</Label>
                  <Label className="right-label">{user.surname}</Label>
                </tr>
                <tr>
                  <Label className="left-label">Gender:</Label>
                  <Label className="right-label">{user.gender}</Label>
                </tr>
                <tr>
                  <Label className="left-label">Birthday:</Label>
                  <Label className="right-label">
                    {birthday(user.birthday)}
                  </Label>
                </tr>
                <tr>
                  <Label className="left-label">Email:</Label>
                  <Label className="right-label">{user.email}</Label>
                </tr>
                {/* <tr>
            <Label>Change Password</Label>
          </tr> */}
              </Table>
              <button type="button" onClick={(e) => setIsEditing(true)}>
                Edit
              </button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="profile">
      {isEditing ? <EditProfile></EditProfile> : Profile()}
    </div>
  );
}

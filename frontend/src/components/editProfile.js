import React, { useState, useEffect } from "react";
import { Form, Label, FormGroup, Button, Input } from "reactstrap";
import Profile from "./profile";
import axios from "axios";
import "animate.css";
import "../styles/components/editProfile.scss";
import { faTimesCircle, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
export default function EditProfile() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState();
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [cancel, setCancel] = useState(false);
  const [okay, setOkay] = useState(false);
  const changeBirthday = (userData) => {
    let user = new Date(userData);
    let day = user.getUTCDate();
    let month = user.getMonth() + 1;
    let year = user.getUTCFullYear();
    return day + "." + month + "." + year;
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/users/profile",
        { _id:JSON.parse(localStorage.getItem("userInfo"))._id,name, surname,gender, birthday, email},
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      setError(error.response.data.message);
    }
    window.location.reload();
  };
  useEffect(() => {
    if (cancel) {
      window.location.reload();
    }
    return () => {};
  });
  return (
    <div className="edit-profile animate__animated animate__backInRight">
      <div className="edit-profile-container">
        <div className="edit-profile-top">
          <div className="edit-profile-top-label">
            <FontAwesomeIcon className="fa-label-icon" icon={faUserEdit} />
            <Label>/ Edit Profile</Label>
          </div>
          <div className="edit-profile-top-button">
            <button type="button" onClick={(e) => setCancel(true)}>
              <FontAwesomeIcon
                className="fa-icon"
                icon={faTimesCircle}
              ></FontAwesomeIcon>
            </button>
          </div>
        </div>
        <div className="edit-profile-form">
          <Form onSubmit={submitHandler}>
            <FormGroup>
              {/* {message && <ErrorMessage variant="warning">{message}</ErrorMessage>}
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
            </FormGroup>
            <FormGroup>
              <Label>Name:</Label>
              <Input
                type="name"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={user.name}
              />
              <Label>Surname:</Label>
              <Input
                type="name"
                name="surname"
                id="surname"
                value={surname}
                placeholder={user.surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Birthday:</Label>
              <Input
                type="date"
                name="birthday"
                id="birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                placeholder={changeBirthday(user.birthday)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email:</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={user.email}
              />
            </FormGroup>
            <FormGroup>
              <Label>Gender:</Label>
              <Input
                type="select"
                name="gender"
                id="gender"
                className="input-gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <option>{user.gender}</option>
                <option>Male</option>
                <option>Female</option>
              </Input>
            </FormGroup>
            {/* <FormGroup>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            id="passwordVerify"
            value={passwordVerify}
            placeholder="Password Verify"
            onChange={(e) => setPasswordVerify(e.target.value)}
          />
        </FormGroup>        */}
            <Button
              className="btn"
              type="submit"
              onClick={(e) => setOkay(true)}
            >
              {!okay ? (
                "Okay"
              ) : (
                <FontAwesomeIcon className="fa-button-icon" icon={faThumbsUp} />
              )}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

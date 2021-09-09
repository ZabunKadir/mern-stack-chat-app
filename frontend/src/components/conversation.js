import "../styles/components/conversation.scss";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Label } from "reactstrap";
import "animate.css";
export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios(
          "http://localhost:5000/api/users?_id=" + friendId
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="conversation animate__animated animate__fadeIn">
      <img
        className="conversation-image"
        src="https://odtukaltev.com.tr/wp-content/uploads/2018/04/person-placeholder.jpg"
        alt="friend profile"
      ></img>
      <Label className="conversation-label">{user?.name || ""}{"  "}{user?.surname || ""}</Label>
      {/* <button className="user">
              <div className="user-image-box">
                <img className="user-image" ></img>
              </div>
              <div className="user-label-box">
                <Label className="user-label">User Name</Label>
              </div>
              <div className="user-notification-box">
                <FontAwesomeIcon icon={faCircle}></FontAwesomeIcon>
              </div>
            </button> */}
    </div>
  );
}

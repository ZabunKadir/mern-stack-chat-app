import "../styles/components/search.scss";
import React from "react";
import axios from "axios";
import { Label } from "reactstrap";
export default function Search({ user,setIsSearching }) {
 const startChat = ()=>{
    const payload = {
      senderId:JSON.parse(localStorage.getItem("userInfo"))._id,
      receiverId:user._id
    }
    axios.post("http://localhost:5000/api/conversations",payload)
    setIsSearching(false);
 }
  return (
    <div onClick={()=>startChat()} className="search animate__animated  animate__fadeIn">
      <div className="search-main">
        <img
          className="search-image animate__animated  animate__fadeInLeft"
          src="https://odtukaltev.com.tr/wp-content/uploads/2018/04/person-placeholder.jpg"
          alt="search profile"
        ></img>
        <Label className="search-label animate__animated  animate__fadeInDown">
        {user?.name || '-'} {user?.surname || '-'}
        </Label>
        {/* <Label className="search-label animate__animated  animate__fadeInDown">{user? user.name : (currentUser? currentUser.name : "")}{" "}{user? user.surname : (currentUser? currentUser.surname : "")}</Label> */}
        <div className="search-add-friend animate__animated  animate__fadeInRight">
          <div className="add-friend-bg ">
            <Label className="add-friend-bg-label">Add</Label>
          </div>
        </div>
      </div>

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

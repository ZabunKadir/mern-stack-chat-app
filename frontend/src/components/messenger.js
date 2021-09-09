import React, { useState, useEffect, useRef } from "react";
import { Input, Label } from "reactstrap";
import "../styles/components/messenger.scss";
import axios from "axios";
import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faSmile,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faEllipsisV,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "animate.css";
import Conversation from "./conversation";
import Message from "./message";
import Search from "./search";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
export default function Messenger() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const scrollRef = useRef();
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [receiver, setReceiver] = useState();
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {});
  }, [user]);

  const getUsers = async (hint) => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/search", {
        params: { hint },
      });
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers(search);
  }, [search]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/conversations/" + user._id
        );
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user._id, isSearching]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post(
        "http://localhost:5000/api/messages",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getUser = async () => {
      const receiverId = currentChat?.members.find(
        (member) => member !== user._id
      );
      if (!receiverId) {
        return;
      }
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users?_id=" + receiverId
        );
        setReceiver(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentChat]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="messenger animate__animated animate__fadeIn">
      <aside>
        <div className="aside-top">
          <div className="aside-top-user">
            <div className="aside-top-label">
              <FontAwesomeIcon
                className="user-top-icon"
                icon={faComments}
              ></FontAwesomeIcon>
            </div>
            <div>
              <Label>Welcome to {" " + user.name}</Label>
            </div>
          </div>
          <div className="aside-top-search">
            <div>
              <FontAwesomeIcon
                className="fa-search-icon"
                icon={faSearch}
                to="user-search"
              ></FontAwesomeIcon>
              <Input
                type="search"
                id="user-search"
                name="user-search"
                placeholder="Search Friends"
                value={search}
                // onClick={searchHandler}
                onFocus={(e) => setIsSearching(true)}
                onChange={(e) => setSearch(e.target.value)}
              ></Input>
              <button
                disabled={!isSearching}
                onClick={() => setIsSearching(false)}
              >
                <FontAwesomeIcon
                  className="fa-search-close"
                  icon={faTimesCircle}
                ></FontAwesomeIcon>
              </button>
            </div>
          </div>
        </div>
        <div className="aside-main">
          {isSearching ? (
            <div className="aside-main-search">
              {users.map((c, i) => (
                <div>
                  <Search
                    user={c}
                    key={i}
                    setIsSearching={setIsSearching}
                  ></Search>
                </div>
              ))}
            </div>
          ) : (
            <div className="aside-main-user">
              {conversations.map((c, i) => (
                <div
                  className="conversation-main"
                  onClick={() => setCurrentChat(c)}
                >
                  <Conversation
                    key={i}
                    currentUser={user}
                    conversation={c}
                  ></Conversation>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
      {currentChat ? (
        <main>
          <div className="main-top">
            <div className="main-top-name">
              <div className="main-top-name-image">
                {" "}
                <img src={user.image} alt="friend photograf"></img>
              </div>
              <div className="main-top-name-label">
                <Label>{receiver?.name} {receiver?.surname}</Label>
              </div>
            </div>
            <div className="main-top-button">
              <button className="profile-button">
                <FontAwesomeIcon
                  className="fa-config-icon"
                  icon={faUser}
                ></FontAwesomeIcon>
              </button>
              <button className="config-button">
                <FontAwesomeIcon
                  className="fa-config-icon"
                  icon={faEllipsisV}
                ></FontAwesomeIcon>
              </button>
            </div>
          </div>

          <div className="main-chat-box">
            {messages.map((m, y) => (
              <div ref={scrollRef}>
                <Message
                  key={y}
                  message={m}
                  own={m.sender === user._id}
                ></Message>
              </div>
            ))}
          </div>
          <div className="main-send-box">
            <div className="main-send-box-emoji">
              <button className="emoji">
                <FontAwesomeIcon
                  className="fa-emoji-icon"
                  icon={faSmile}
                ></FontAwesomeIcon>
              </button>
            </div>
            <div className="main-send-box-input">
              <Input
                type="textarea"
                value={newMessage}
                className="main-send-box-textarea"
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder=".../Input Message\..."
              ></Input>
            </div>
            <div className="main-send-box-button">
              <button className="send-button" onClick={handleSubmit}>
                <FontAwesomeIcon
                  className="fa-send-icon"
                  icon={faPaperPlane}
                ></FontAwesomeIcon>
              </button>
            </div>
          </div>
        </main>
      ) : (
        <div className="no-conversation animate__animated ">
          <div className="no-conversation-logo animate__animated animate__fadeIn">
            <Label>CHAT APP</Label>
          </div>
          <div className="no-conversation-image animate__animated animate__pulse">
            <img
              src="https://www.vervelogic.com/images/vl-page/vl-chat-application/vl-chat-application.png"
              alt="Main Illustrator"
            ></img>
          </div>
          <div className="no-conversation-label animate__animated animate__pulse">
            <Label>Open A Conversation To Start A Chat. </Label>
          </div>
          <div className="no-conversation-labelTwo animate__animated animate__pulse">
            <Label>Click friend and start chat. </Label>
          </div>
        </div>
      )}
    </div>
  );
}

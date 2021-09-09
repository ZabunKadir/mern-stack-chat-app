import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import "../styles/components/contact.scss";
import "animate.css";
import axios from "axios";
import ErrorMessage from "./errorMessage";
import { useHistory } from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {  faThumbsUp } from "@fortawesome/free-regular-svg-icons";
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [send, setSend] = useState("");
  const history = useHistory();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!message) {
      setError("Please Fill Message")
    } else {
      try {
        const config = {
          headers: { "Content-type": "application/json" },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/contact",
          { name, email, message },
          config
        );
        setSend("Thank For Your Feedback");
      } catch (error) {
        setError(error.response.data.message);
      }
    }

  };
  return (
    <div className="contact animate__animated animate__zoomInDown">
      <div className="contact-main">
        <Form onSubmit={submitHandler}>
          <label>CONTACT</label>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {send && <ErrorMessage variant="success">{send}<FontAwesomeIcon style={{margin:"0 10px"}} icon={faThumbsUp}></FontAwesomeIcon></ErrorMessage>}
          <FormGroup>
            <Input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="exampleEmail"
              placeholder="E-Mail"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="textarea"
              name="text"
              id="exampleText"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
            />
          </FormGroup>
          <Button className="btn" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Contact;

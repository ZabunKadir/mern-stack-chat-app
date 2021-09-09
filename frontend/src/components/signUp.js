import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "../styles/components/signUp.scss";
import axios from "axios";
import ErrorMessage from "./errorMessage";
import { useHistory } from "react-router-dom";
function SignUp() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== passwordVerify) {
      setMessage("Password Do Not Match!");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: { "Content-type": "application/json" },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/users",
          { name, surname, birthday, email, password },
          config
        );
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        setError(error.response.data.message);
      }
    }
    history.push("/messenger");
    window.location.reload();
  };

  return (
    <div className="sign-up animate__animated animate__fadeInLeftBig">
      <Form onSubmit={submitHandler}>
        <label className="title">SIGN UP</label>
        <FormGroup>
          {message && <ErrorMessage variant="warning">{message}</ErrorMessage>}
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Input
            type="name"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <Input
            type="name"
            name="surname"
            id="surname"
            value={surname}
            placeholder="Surname"
            onChange={(e) => setSurname(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="date"
            name="birthday"
            id="birthday"
            value={birthday}
            placeholder="Birthday"
            onChange={(e) => setBirthday(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail"
          />
        </FormGroup>
        <FormGroup>
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
        </FormGroup>
        <FormGroup>
          <Input type="checkbox" className="terms-checkbox"></Input>
          <Label className="terms-label">
            I aggre all statements in <a href="ased">Terms of service</a>
          </Label>
        </FormGroup>
        <Button className="btn" type="submit">
          Sign Up
        </Button>
        <Label className="sign-up-label">
          Have already an account?
          <a href="login">Sign In</a>
        </Label>
      </Form>
    </div>
  );
}

export default SignUp;

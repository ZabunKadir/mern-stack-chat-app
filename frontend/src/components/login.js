import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "../styles/components/login.scss";
import ErrorMessage from "./errorMessage";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
     
    }
    
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      setError(error.response.data.message);
    }
    history.push("/messenger");
    window.location.reload();
  };
  return (
    <div className="login animate__animated animate__fadeInRightBig">
      <Form onSubmit={submitHandler}>
        <label className="title">LOGIN</label>
        <FormGroup>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label for="email">E-Mail</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <a href="3123" className="forgot">
            Forgot your password?
          </a>
        </FormGroup>
        <Button className="btn" type="submit">
          Login
        </Button>
        <Label className="sign-up-label">
          Don't have an account?
          <a href="signUp">Sign Up</a>
        </Label>
      </Form>
    </div>
  );
};
export default Login;

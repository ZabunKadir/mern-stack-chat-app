import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "animate.css";
import React from "react";
import Header from "./components/header";
import Home from "./components/home";
import Footer from "./components/footer";
import Contact from "./components/contact";
import SignUp from "./components/signUp";
import Login from "./components/login";
import Profile from "./components/profile";
import Messenger from "./components/messenger"
export default function App() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route  path="/profile">
          <Profile></Profile>
        </Route>
        <Route path="/messenger">
          <Messenger/>
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

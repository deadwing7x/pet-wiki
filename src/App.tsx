/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";
import "./App.css";
import catlogo from "./assets/catwikilogo.svg";
import Reasons from "./components/Reasons/Reasons";
import Footer from "./components/Footer/Footer";
import MainContent from "./components/MainContent/MainContent";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Breed from "./components/Breed/Breed";

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <div className="App">
          <a
            className="pet-changer"
            role="link"
            href="/"
            rel="no-referrer no-opener"
          >
            <img className="logo" src={catlogo} alt="logo" />
          </a>
          <Route exact path="/">
            <MainContent />
            <Reasons />
          </Route>
          <Route path="/breed" component={Breed}>
            <Breed />
          </Route>
          <Footer />
        </div>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

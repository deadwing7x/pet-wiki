import React from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Breed from "./components/Breed/Breed";
import ListBreeds from "./components/ListBreeds/ListBreeds";
import Home from "./components/Home/Home";
import MainContent from "./components/MainContent/MainContent";
import Reasons from "./components/Reasons/Reasons";
import { IPet } from "./model/IPet";

const App: React.FC<{}> = () => {
  const dog: IPet = {
    name: "dog",
  };

  const cat: IPet = {
    name: "cat",
  };

  return (
    <BrowserRouter>
      <Switch>
        <div className="App">
          <Route exact path="/">
            <>
              <div className="app-desc">
                <a className="home-link" href="/">
                  <p className="app-name">Fine Furlly</p>
                </a>
                <p className="app-info">
                  Everything you need to know about those beautiful furry pets
                  that you have.
                </p>
              </div>
              <Home />
            </>
          </Route>
          <Route exact path="/cat-wiki">
            <a className="home-link" href="/">
              <p className="app-name">Fine Furlly</p>
            </a>
            <MainContent {...cat} />
            <Reasons {...cat} />
          </Route>
          <Route exact path="/dog-wiki">
            <a className="home-link" href="/">
              <p className="app-name">Fine Furlly</p>
            </a>
            <MainContent {...dog} />
            <Reasons {...dog} />
          </Route>
          <Route path="/breed" component={Breed}>
            <a className="home-link" href="/">
              <p className="app-name">Fine Furlly</p>
            </a>
            <Breed />
          </Route>
          <Route path="/dog-wiki/list-breeds" component={ListBreeds}>
            <a className="home-link" href="/">
              <p className="app-name">Fine Furlly</p>
            </a>
            <ListBreeds {...dog} />
          </Route>
          <Route path="/cat-wiki/list-breeds" component={ListBreeds}>
            <a className="home-link" href="/">
              <p className="app-name">Fine Furlly</p>
            </a>
            <ListBreeds {...cat} />
          </Route>
          <Footer />
        </div>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

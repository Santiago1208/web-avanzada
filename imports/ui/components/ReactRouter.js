import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";
import Login from "./Login";
import App from "../App";
import Registrar from "./Registrar";
import MatchesInGame from "./MatchesInGame";

class ReactRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              return <Login />;
            }}
          />
          <Route
            path="/App"
            exact
            render={() => {
              return <App />;
            }}
          />
          <Route
            path="/registrar"
            exact
            render={() => {
              return <Registrar />;
            }}
          />
          <Route
            path = "/partidas"
            exact
            render={() => {
              return <MatchesInGame/>;
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default ReactRouter;

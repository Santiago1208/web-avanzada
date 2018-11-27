import React, { Component } from "react";
import Tournaments from "./components/Tournaments.js";
import NavBar from "./components/NavBar.js";
import { Redirect } from "react-router-dom";
import TournamentPanelAdmin from "./components/TournamentPanelAdmin.js";
import RequestList from "./components/RequestList.js";

class App extends Component {
  //<Tournaments/>
  render() {
    if (sessionStorage.getItem("usuario") != null) {
      
      if (sessionStorage.getItem("rol") == "admin") {
        return (
          <div className="container-fluid">
            <NavBar />
            <TournamentPanelAdmin />
            <RequestList />
          </div>
        );
      } else {
        return (
          <div className="container-fluid">
            <NavBar />

            <Tournaments />
          </div>
        );
      }
    } else {
      return <Redirect to={{ pathname: "/" }} />;
    }
  }
}
export default App;

import React, { Component } from "react";
import Tournaments from "./components/Tournaments.js";
import NavBar from "./components/NavBar.js";
import { Redirect } from "react-router-dom";

class App extends Component {
  render() {
    if (sessionStorage.getItem("usuario") != null) {
      return (
        <div className="container-fluid">
          <NavBar/>

					
					<Tournaments/>
        </div>
      );
    } else {
      return <Redirect to={{ pathname: "/" }} />;
    }
  }
}
export default App;

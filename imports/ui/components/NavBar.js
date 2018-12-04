import React, { Component } from "react";

export default class NavBar extends Component {
  
  handlePartidasEnJuego(event) {
    event.preventDefault();
    window.location.replace("/partidas");
  }

  handleLogOut(event) {
    event.preventDefault();
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("rol");
    window.location.replace("/");
  }

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-light bg-light">
        <div className="container-fluid">
          <div className="navbar-header">
            <form className="form-inline my-2 my-lg-0">
              <div className="form-group row">
                <button className="btn btn-outline-success my-2 my-sm-0" type="button" 
                onClick={this.handlePartidasEnJuego.bind(this)}>
                  Partidas en juego
                </button>
              </div>
            </form>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <form className="form-inline my-2 my-lg-0">
              <div className="form-group row">
                <span className="navbar-text">
                  {sessionStorage.getItem("usuario")}
                </span>
                &nbsp; &nbsp;
                <a className="nav-link" onClick={this.handleLogOut.bind(this)}>
                  Log out <i className="fas fa-sign-out-alt" />
                </a>
              </div>
            </form>
          </ul>
        </div>
      </nav>
    );
  }
}

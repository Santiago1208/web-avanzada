import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { coleccionClientes } from "../../api/db.js";

export default class Registrar extends Component {
  constructor(props) {
    super(props);
  }

  handleRegistrar(event) {
    event.preventDefault();

    const nombreCompleto = ReactDOM.findDOMNode(this.refs.inputNombreCompleto).value;
    const nombreUsuario = ReactDOM.findDOMNode(this.refs.inputUsuario).value;
    const pwdUsuario = ReactDOM.findDOMNode(this.refs.inputPassword).value;
    const email = ReactDOM.findDOMNode(this.refs.inputEmail).value;
    const rol = "estudiante";

    if (!(nombreUsuario != "" && pwdUsuario != "" && email != "" && nombreCompleto != "")) {
      document.getElementById("lblMensaje").innerHTML =
        "No se debe dejar campos vacios";
      $("#modalCenter").modal("show");
      return;
    }

    let documentoUsuario = coleccionClientes.findOne({
      usuario: nombreUsuario
    });
    if (documentoUsuario) {
      document.getElementById("lblMensaje").innerHTML =
        "Ya existe un usuario con este nombre";
      $("#modalCenter").modal("show");
    } else {
      Meteor.call("clientes.insert", nombreUsuario, pwdUsuario, email, nombreCompleto, rol);

      window.location.replace("/");
    }
  }

  render() {
    if (sessionStorage.getItem("usuario") == null) {
      return (
        <div className="container-fluid" id="estiloLogin">
          <div className="card" style={{ width: "18rem" }}>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <form className="px-4 py-3">
                <div className="form-group">
                    <label htmlFor="inputNombreCompleto">Nombre Completo</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputNombreCompleto"
                      ref="inputNombreCompleto"
                      placeholder="Nombre Completo"
                    />
                </div>
                  <div className="form-group">
                    <label htmlFor="inputUsuario">Codigo estudiante</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputUsuario"
                      ref="inputUsuario"
                      placeholder="Codigo"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPassword">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                      ref="inputPassword"
                      placeholder="Contraseña"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputEmail">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail"
                      ref="inputEmail"
                      placeholder="ejemplo@hotmail.com"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={this.handleRegistrar.bind(this)}
                  >
                    Registrar
                  </button>
                </form>
              </li>
              <li className="list-group-item">
                <a className="dropdown-item" href="/">
                  Volver a ingresar
                </a>
              </li>
            </ul>
          </div>

          <div
            className="modal fade"
            id="modalCenter"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
            data-show="false"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalCenterTitle">
                    Error
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <label id="lblMensaje">...</label>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="modalCenter2"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
            data-show="false"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalCenterTitle2">
                    <label id="lblMensajeTitulo2">...</label>
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <label id="lblMensaje2">...</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to={{ pathname: "/App" }} />;
    }
  }
}

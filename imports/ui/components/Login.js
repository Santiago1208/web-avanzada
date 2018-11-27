import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { coleccionClientes } from "../../api/db.js";

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  handleIngresar(event) {
    event.preventDefault();

    const nombreUsuario = ReactDOM.findDOMNode(this.refs.inputUsuario).value;
    const pwdUsuario = ReactDOM.findDOMNode(this.refs.inputPassword).value;

    if (!(nombreUsuario != "" && pwdUsuario != "")) {
      document.getElementById("lblMensaje").innerHTML =
        "No se debe dejar campos vacios";
      $("#modalCenter").modal("show");
      return;
    }

    let documentoUsuario = coleccionClientes.findOne({
      usuario: nombreUsuario
    });

    if (documentoUsuario) {
        if(documentoUsuario.pwd == pwdUsuario){
            sessionStorage.setItem("usuario", nombreUsuario);
            sessionStorage.setItem("usuarioObj", documentoUsuario);

            window.location.replace("/App");
        }else{
            document.getElementById("lblMensaje").innerHTML =
            "Contraseña incorrecta";
          $("#modalCenter").modal("show");
          return;
        }
    }else{
        document.getElementById("lblMensaje").innerHTML =
        "Usuario no existe";
      $("#modalCenter").modal("show");
      return;
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
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={this.handleIngresar.bind(this)}
                  >
                    Ingresar
                  </button>
                </form>
              </li>
              <li className="list-group-item">
                <a className="dropdown-item" href="/registrar">
                  ¿Nuevo por aquí? Registrarse
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
        </div>
      );
    } else {
      return <Redirect to={{ pathname: "/App" }} />;
    }
  }
}

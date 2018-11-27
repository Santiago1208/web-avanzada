import React, { Component } from "react";
import ReactDOM from "react-dom";

// Task component - represents a single todo item
export default class TournamentPanelAdmin extends Component {
  handleSubmit(event) {
    event.preventDefault();

    const nombreTorneo = ReactDOM.findDOMNode(this.refs.inputNombreTorneo)
      .value;
    const responsable = sessionStorage.getItem("usuario");
    const fechaInicioTorneo = ReactDOM.findDOMNode(
      this.refs.inputFechaInicioTorneo
    ).value;
    const fechaFinalizacionTorneo = ReactDOM.findDOMNode(
      this.refs.inputFechaFinalizacionTorneo
    ).value;
    const numeroMaximoParticipantes = ReactDOM.findDOMNode(
      this.refs.inputNumeroMaximoParticipantes
    ).value;

    if (
      !(
        nombreTorneo != "" &&
        numeroMaximoParticipantes != "" &&
        fechaInicioTorneo != "" &&
        fechaFinalizacionTorneo != ""
      )
    ) {
      document.getElementById("lblMensaje").innerHTML =
        "Se deben diligenciar todos los campos para crear el proyecto";
      $("#modalCenter").modal("show");
      return;
    }

    let splitFechaInicio = fechaInicioTorneo.split("-");
    if (splitFechaInicio.length < 3) {
      document.getElementById("lblMensaje").innerHTML =
        "La fecha inicio no tiene el formato correcto";
      $("#modalCenter").modal("show");
      return;
    }
    let fechaInicio = new Date(
      splitFechaInicio[0],
      splitFechaInicio[1] - 1,
      splitFechaInicio[2]
    );

    let splitFechaEntrega = fechaFinalizacionTorneo.split("-");
    if (splitFechaInicio.length < 3) {
      document.getElementById("lblMensaje").innerHTML =
        "La fecha de entrega no tiene el formato correcto";
      $("#modalCenter").modal("show");
      return;
    }
    let fechaEntrega = new Date(
      splitFechaEntrega[0],
      splitFechaEntrega[1] - 1,
      splitFechaEntrega[2]
    );

    if (fechaInicio.getTime() > fechaEntrega.getTime()) {
      document.getElementById("lblMensaje").innerHTML =
        "La fecha de inicio debe ser menor o igual a la fecha de entrega";
      $("#modalCenter").modal("show");
      return;
    }

    Meteor.call(
      "torneos.insert",
      nombreTorneo,
      responsable,
      fechaInicio,
      fechaEntrega,
      numeroMaximoParticipantes
    );

    ReactDOM.findDOMNode(this.refs.inputNombreTorneo).value = "";
    ReactDOM.findDOMNode(this.refs.inputFechaInicioTorneo).value = "";
    ReactDOM.findDOMNode(this.refs.inputFechaFinalizacionTorneo).value = "";
    ReactDOM.findDOMNode(this.refs.inputNumeroMaximoParticipantes).value = "";

    document.getElementById("lblMensaje2").innerHTML =
        "El Torneo se creo correctamente";
      $("#modalCenter2").modal("show");
  }

  render() {
    return (
      <div>
        <h4>Agregar Torneo</h4>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group row">
            <label
              htmlFor="inputNombreTorneo"
              className="col-sm-2 col-form-label"
            >
              Nombre
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                ref="inputNombreTorneo"
                id="inputNombreTorneo"
                placeholder="Nombre del torneo"
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputFechaInicioTorneo"
              className="col-sm-2 col-form-label"
            >
              Fecha Inicio Torneo
            </label>
            <div className="col-sm-10">
              <input
                type="date"
                className="form-control"
                id="inputFechaInicioTorneo"
                ref="inputFechaInicioTorneo"
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputFechaFinalizacionTorneo"
              className="col-sm-2 col-form-label"
            >
              Fecha Finalización Torneo
            </label>
            <div className="col-sm-10">
              <input
                type="date"
                className="form-control"
                id="inputFechaFinalizacionTorneo"
                ref="inputFechaFinalizacionTorneo"
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputNumeroMaximoParticipantes"
              className="col-sm-2 col-form-label"
            >
              Número máximo participantes
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                ref="inputNumeroMaximoParticipantes"
                id="inputNumeroMaximoParticipantes"
                placeholder="Numero maximo participantes"
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">
                Agregar Torneo
              </button>
            </div>
          </div>
        </form>

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
  }
}

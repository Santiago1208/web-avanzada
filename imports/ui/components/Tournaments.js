import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";
import { coleccionTorneos } from "../../api/db.js";

import TournamentItem from "./TournamentItem.js";
import BoardItem from "./BoardItem.js";
import { Meteor } from "meteor/meteor";

class Tournaments extends Component {
  constructor() {
    super();

    this.state = {
      torneoDetalle: null
    };
  }

  renderTorneos() {
    return this.props.torneos.map(torneo => (
      <TournamentItem
        key={torneo._id}
        torneo={torneo}
        onClickItem={this.handleTablaPosicionesTorneo.bind(this)}
        onClickItem2={this.handlePeticionesTorneo.bind(this)}
      />
    ));
  }

  handlePeticionesTorneo(torneo) {
    let codigoUsuario = sessionStorage.getItem("usuario");

    Meteor.call("solicitudes.insert", torneo._id, codigoUsuario);
  }

  handleRetos(jugador, jugadorSesion) {
    if (this.state.torneoDetalle.tablaRetos) {
      let documentoReto = this.state.torneoDetalle.tablaRetos.find(
        function findRecord(reto) {
          return (
            reto.jugador1Codigo == jugadorSesion.codigo ||
            reto.jugador2Codigo == jugadorSesion.codigo
          );
        }
      );

      if (documentoReto) {
        document.getElementById("lblMensaje").innerHTML =
          "Hay un reto en progreso! El jugador " +
          documentoReto.jugador1Nombre +
          " retó a " +
          documentoReto.jugador2Nombre;
        $("#modalCenter").modal("show");
      } else {
        Meteor.call(
          "retos.insert",
          this.state.torneoDetalle._id,
          jugadorSesion,
          jugador
        );

        document.getElementById("lblMensaje2").innerHTML =
          "Se ha retado al jugador " + jugador.nombre + "!";
        $("#modalCenter2").modal("show");
      }
    } else {
      Meteor.call(
        "retos.insert",
        this.state.torneoDetalle._id,
        jugadorSesion,
        jugador
      );

      document.getElementById("lblMensaje2").innerHTML =
        "Se ha retado al jugador " + jugador.nombre + "!";
      $("#modalCenter2").modal("show");

      this.setState({
        torneoDetalle: coleccionTorneos.findOne({_id: this.state.torneoDetalle._id})
      });
    }
  }

  renderTablaPosiciones() {
    if (this.state.torneoDetalle === null) {
      return (
        <tr>
          <th colSpan="2">
            Seleccione un torneo para ver su tabla de posiciones
          </th>
        </tr>
      );
    } else if (!this.state.torneoDetalle.tablaPosiciones) {
      return (
        <tr>
          <th colSpan="2">
            Aún no se han aceptado participantes en este torneo
          </th>
        </tr>
      );
    } else {
      let jugadorSesion = this.state.torneoDetalle.tablaPosiciones.find(
        function findRecord(jugador) {
          return jugador.codigo == sessionStorage.getItem("usuario");
        }
      );
      let orderedTable = this.state.torneoDetalle.tablaPosiciones.sort(function(
        a,
        b
      ) {
        return a.posicion - b.posicion;
      });

      return orderedTable.map(jugador => (
        <BoardItem
          key={jugador.codigo}
          jugador={jugador}
          jugadorSesion={jugadorSesion}
          onClickItem={this.handleRetos.bind(this)}
        />
      ));
    }
  }

  handleTablaPosicionesTorneo(torneo) {
    this.setState({
      torneoDetalle: torneo
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm">
            <div className="container-fluid">
              <h3>Torneos</h3>

              {this.renderTorneos()}
            </div>
          </div>
          <div className="col-sm">
            <h3>Tabla de posiciones</h3>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Posición</th>
                  <th scope="col">Código participante</th>
                  <th scope="col">Nombre participante</th>
                  <th scope="col">Retar</th>
                </tr>
              </thead>
              <tbody>{this.renderTablaPosiciones()}</tbody>
            </table>
          </div>
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
                  <label id="lblMensajeTitulo2">Reto exitoso</label>
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

export default withTracker(() => {
  return {
    torneos: coleccionTorneos.find().fetch()
  };
})(Tournaments);

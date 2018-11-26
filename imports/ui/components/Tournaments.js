import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";
import { coleccionTorneos } from "../../api/db.js";

import TournamentItem from "./TournamentItem.js";
import BoardItem from "./BoardItem.js";

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
      />
    ));
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
      return this.state.torneoDetalle.tablaPosiciones.map(jugador => (
        <BoardItem key={jugador.codigo} jugador={jugador} />
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
                  <th scope="col">Participante</th>
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
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    torneos: coleccionTorneos.find().fetch()
  };
})(Tournaments);

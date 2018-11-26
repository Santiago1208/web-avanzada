import React, { Component } from "react";

// Task component - represents a single todo item
export default class TournamentItem extends Component {
  handleTablaPosiciones() {
    this.props.onClickItem(this.props.torneo);
  }

  render() {
    return (
      <div className="card bg-light mb-3" style={{ width: "18rem" }}>
        <div className="card-header">{this.props.torneo.nombre}</div>
        <div className="card-body">
          <p className="card-text">
            Fecha de inicio: {this.props.torneo.fechaInicio.toDateString()}
          </p>
          <p className="card-text">
            Fecha de finalización: {this.props.torneo.fechaFinalizacion.toDateString()}
          </p>
          <p className="card-text">
            Máximo número de participantes: {this.props.torneo.maxNumPart}
          </p>
          <button type="button" className="btn btn-outline-secondary">
            Inscribirse
          </button>
          &nbsp;
          <button type="button" className="btn btn-outline-secondary" onClick={this.handleTablaPosiciones.bind(this)}>
            Ver
          </button>
        </div>
      </div>
    );
  }
}

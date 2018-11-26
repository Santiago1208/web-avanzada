import React, { Component } from "react";

// Task component - represents a single todo item
export default class ProyectoJS extends Component {
  handleTareas() {
    this.props.onClickItem(this.props.proyecto);
  }

  render() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    if (
      this.props.proyecto.fechaEntrega.getTime() < today.getTime() &&
      this.props.proyecto.estado != "Terminado"
    ) {
      return (
        <tr className="table-danger">
          <th>{this.props.proyecto.nombre}</th>
          <th>{this.props.proyecto.descripcion}</th>
          <th>{this.props.proyecto.responsable}</th>
          <th>{this.props.proyecto.fechaInicio.toDateString()}</th>
          <th>{this.props.proyecto.fechaEntrega.toDateString()}</th>
          <th>{this.props.proyecto.estado}</th>
          <th>
            <button
              type="button"
              className="btn btn-info"
              onClick={this.handleTareas.bind(this)}
            >
              +
            </button>
          </th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th>{this.props.proyecto.nombre}</th>
          <th>{this.props.proyecto.descripcion}</th>
          <th>{this.props.proyecto.responsable}</th>
          <th>{this.props.proyecto.fechaInicio.toDateString()}</th>
          <th>{this.props.proyecto.fechaEntrega.toDateString()}</th>
          <th>{this.props.proyecto.estado}</th>
          <th>
            <button
              type="button"
              className="btn btn-info"
              onClick={this.handleTareas.bind(this)}
            >
              +
            </button>
          </th>
        </tr>
      );
    }
  }
}

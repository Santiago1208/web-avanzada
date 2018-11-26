import React, { Component } from "react";

// Task component - represents a single todo item
export default class TareaJS extends Component {

  render() {
    return (
      <tr>
        <th>{this.props.tarea.nombre}</th>
        <th>{this.props.tarea.descripcion}</th>
        <th>{this.props.tarea.prioridad}</th>
        <th>{this.props.tarea.fechaCreacion.toDateString()}</th>
      </tr>
    );
  }
}

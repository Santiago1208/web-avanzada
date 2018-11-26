import React, { Component } from "react";

// Task component - represents a single todo item
export default class BoardItem extends Component {

  render() {
    return (
      <tr>
        <th>{this.props.jugador.posicion}</th>
        <th>{this.props.jugador.codigo}</th>
      </tr>
    );
  }
}

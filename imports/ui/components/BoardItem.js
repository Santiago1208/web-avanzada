import React, { Component } from "react";

// Task component - represents a single todo item
export default class BoardItem extends Component {
  handleRetos() {
    this.props.onClickItem(this.props.jugador, this.props.jugadorSesion);
  }

  render() {
    if (!this.props.jugadorSesion) {
      return (
        <tr>
          <th>{this.props.jugador.posicion}</th>
          <th>{this.props.jugador.codigo}</th>
          <th>{this.props.jugador.nombre}</th>
          <th />
        </tr>
      );
    }

    if (
      this.props.jugadorSesion.posicion - 2 <= this.props.jugador.posicion &&
      this.props.jugador.posicion < this.props.jugadorSesion.posicion
    ) {
      return (
        <tr>
          <th>{this.props.jugador.posicion}</th>
          <th>{this.props.jugador.codigo}</th>
          <th>{this.props.jugador.nombre}</th>
          <th>
            <i
              className="fas fa-chess fa-2x"
              onClick={this.handleRetos.bind(this)}
            />
          </th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th>{this.props.jugador.posicion}</th>
          <th>{this.props.jugador.codigo}</th>
          <th>{this.props.jugador.nombre}</th>
          <th />
        </tr>
      );
    }
  }
}

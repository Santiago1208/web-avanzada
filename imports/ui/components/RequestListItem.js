import React, { Component } from "react";

export default class RequestItemList extends Component {
    handleAceptarSolicitud() {
        this.props.onClickItem(this.props.torneo,this.props.jugador);
      }

    handleNegarSolicitud(){
        this.props.onClickItem2(this.props.torneo,this.props.jugador);
    }
    render() {
        return (
            <tr>
                <th>{this.props.torneo.nombre}</th>
                <th>{this.props.jugador.usuario}</th>
                <th>{this.props.jugador.nombreCompleto}</th>
                <th>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={this.handleAceptarSolicitud.bind(this)}>✔</button>
                </th>
                <th>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.handleNegarSolicitud.bind(this)}>X</button>
                </th>
            </tr>


        );

    }
}
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";
import { coleccionTorneos } from "../../api/db.js";
import { coleccionClientes } from "../../api/db.js";
import RequestListItem from "./RequestListItem.js";

class RequestList extends Component {

    renderTasks() {
        let result = [];

        for (let i = 0; i < this.props.torneosWithTracker.length; i++) {
            let torneo = this.props.torneosWithTracker[i];
            for (let j = 0; j < torneo.tablaSolicitudes.length; j++) {
                let registroTabla = torneo.tablaSolicitudes[j];
                let documentoJugador = coleccionClientes.findOne({usuario: registroTabla.codigoSolicitante});
                if (documentoJugador) {

                    result.push(<RequestListItem 
                        key={torneo.nombre + registroTabla.codigoSolicitante}
                        jugador={documentoJugador} torneo={torneo} 
                        onClickItem={this.handleAceptarSolicitud.bind(this)}
                        onClickItem2={this.handleNegarSolicitud.bind(this)} 
                        />);
                } else {
                    console.log("Jugador no encontrado: " + registroTabla.codigoSolicitante);
                }

            }

        }

        return result;
    }

    handleAceptarSolicitud(torneo,jugador){
        let maxPosicion = 0;
        for (let i = 0; i < torneo.tablaPosiciones.length; i++){
            if(torneo.tablaPosiciones[i].posicion > maxPosicion){
                maxPosicion = torneo.tablaPosiciones[i].posicion;
            }
        } 

        let posicion = maxPosicion + 1;
        
        Meteor.call("tablaPosiciones.insert",torneo._id,posicion,jugador.usuario,jugador.nombreCompleto);
        Meteor.call("solicitudes.remove",torneo._id,jugador.usuario);
    }
    handleNegarSolicitud(torneo,jugador){
        Meteor.call("solicitudes.remove",torneo._id,jugador.usuario);
    }

    render() {
        return (
            <div>
                <h3>Lista de solicitudes</h3>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Torneo</th>
                            <th scope="col">Código</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Aceptar</th>
                            <th scope="col">Rechazar</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderTasks()}</tbody>
                </table>
            </div>

        );

    }

}

export default withTracker(() => {
    return {
        torneosWithTracker: coleccionTorneos.find({}).fetch()
    };
})(RequestList);




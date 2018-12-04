import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const coleccionTorneos = new Mongo.Collection("torneos");
export const coleccionClientes = new Mongo.Collection("usuarios");

//BORRAR LOS METODOS DE INSERTAR PROYECTOS Y TAREAS Y QUITAR LA CONSTATE
Meteor.methods({
  "torneos.insert"(varNombre, varResponsable, varFechaInicio, varFechaFinalizacion, varNumeroMaximoParticipantes) 
  {
    check(varNombre, String);
    check(varResponsable, String);
    check(varFechaInicio, Date);
    check(varFechaFinalizacion, Date);
    check(varNumeroMaximoParticipantes, String);
 
    coleccionTorneos.insert
    ({
      nombre: varNombre,
      responsable: varResponsable,
      fechaInicio: varFechaInicio,
      fechaFinalizacion: varFechaFinalizacion,
      maxNumPart: varNumeroMaximoParticipantes,
      tablaPosiciones: [],
      tablaSolicitudes: [],
      tablaRetos: []
    });
  },

  "solicitudes.insert"(varIdTorneo, varIdUsuario)
  {
    check(varIdUsuario, String);

    coleccionTorneos.update
    ({ _id: varIdTorneo },
      {
        $addToSet: {tablaSolicitudes: {codigoSolicitante: varIdUsuario}}
      }
    );
  },

  "solicitudes.remove"(varIdTorneo,varIdUsuario) 
  {
    check(varIdUsuario, String);

    coleccionTorneos.update(
      { _id: varIdTorneo },
      {
        $pull: {
          tablaSolicitudes: {
            codigoSolicitante: varIdUsuario
          }
        }
      }
    );
  },

  "tablaPosiciones.insert"(
    varIdTorneo,
    varPosicion,
    varIdUsuario,
    varNombreCompleto
  ) {
    check(varIdUsuario, String);

    coleccionTorneos.update(
      { _id: varIdTorneo },
      {
        $addToSet: {
          tablaPosiciones: {
            posicion: varPosicion,
            codigo: varIdUsuario,
            nombre: varNombreCompleto
          }
        }
      }
    );
  },

  "clientes.insert"(varNombre,varPassword,varEmail,varNombreCompleto,varRol)
   {
    check(varNombre, String);
    check(varPassword, String);
    check(varEmail, String);
    check(varNombreCompleto, String);
    check(varRol, String);

    coleccionClientes.insert(
      {
        usuario: varNombre,
        pwd: varPassword,
        email: varEmail,
        nombreCompleto: varNombreCompleto,
        rol: varRol
      }
    );
  },

  "retos.insert"(varIdTorneo,varJugador1,varJugador2) {
    coleccionTorneos.update(
      { _id: varIdTorneo },
      {
        $addToSet: {
          tablaRetos: {
            jugador1Codigo: varJugador1.codigo,
            jugador1Nombre: varJugador1.nombre,
            jugador2Codigo: varJugador2.codigo,
            jugador2Nombre: varJugador2.nombre,
            estado: "A"
          }
        }
      }
    );
  },

  "torneos.consultarRetos"(nombreTorneo) {
    return coleccionTorneos.find({nombre:nombreTorneo},{tablaRetos:[]});
  },


});

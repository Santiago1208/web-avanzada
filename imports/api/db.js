import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const coleccionTorneos = new Mongo.Collection("torneos");
export const coleccionClientes = new Mongo.Collection("usuarios");

//BORRAR LOS METODOS DE INSERTAR PROYECTOS Y TAREAS Y QUITAR LA CONSTATE
Meteor.methods({
  "torneos.insert"(
    varNombre,
    varResponsable,
    varFechaInicio,
    varFechaFinalizacion,
    varNumeroMaximoParticipantes
  ) {
    check(varNombre, String);
    check(varResponsable, String);
    check(varFechaInicio, Date);
    check(varFechaFinalizacion, Date);
    check(varNumeroMaximoParticipantes, String);
 
    coleccionTorneos.insert({
      nombre: varNombre,
      responsable: varResponsable,
      fechaInicio: varFechaInicio,
      fechaFinalizacion: varFechaFinalizacion,
      maxNumPart: varNumeroMaximoParticipantes,
    });
  },

  "solicitudes.insert"(
    varIdTorneo,
    varIdUsuario
  ) {
    check(varIdUsuario, String);

    coleccionTorneos.update(
      { _id: varIdTorneo },
      {
        $addToSet: {
          tablaSolicitudes: {
            codigoSolicitante: varIdUsuario
          }
        }
      }
    );
  },

  "clientes.insert"(
    varNombre,
    varPassword,
    varEmail,
    varNombreCompleto,
    varRol
  ) {
    check(varNombre, String);
    check(varPassword, String);
    check(varEmail, String);
    check(varNombreCompleto, String);
    check(varRol, String);

    coleccionClientes.insert({
      usuario: varNombre,
      pwd: varPassword,
      email: varEmail,
      nombreCompleto: varNombreCompleto,
      rol: varRol
    });
  }
});

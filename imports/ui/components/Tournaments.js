import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";
import { coleccionProyectos } from "../../api/db.js";

import ProyectoJS from "./Proyecto.js";
import TareaJS from "./Tarea.js";

class Tournaments extends Component {
  constructor() {
    super();

    this.state = {
      proyectoDetalle: null,
      nombreProyectoFiltro: null
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const nombreProyecto = ReactDOM.findDOMNode(this.refs.inputNombreProyecto)
      .value;
    const descripcionProyecto = ReactDOM.findDOMNode(
      this.refs.inputDescripcionProyecto
    ).value;
    const responsable = sessionStorage.getItem("usuario");
    const fechaInicioProyecto = ReactDOM.findDOMNode(
      this.refs.inputFechaInicioProyecto
    ).value;
    const fechaEntregaProyecto = ReactDOM.findDOMNode(
      this.refs.inputFechaEntregaProyecto
    ).value;
    const estadoProyecto = ReactDOM.findDOMNode(this.refs.inputEstadoProyecto)
      .value;

    if (
      !(
        nombreProyecto != "" &&
        descripcionProyecto != "" &&
        fechaInicioProyecto != "" &&
        fechaEntregaProyecto != "" &&
        estadoProyecto != ""
      )
    ) {
      document.getElementById("lblMensaje").innerHTML =
        "Se deben diligenciar todos los campos para crear el proyecto";
      $("#modalCenter").modal("show");
      return;
    }

    let splitFechaInicio = fechaInicioProyecto.split("-");
    if (splitFechaInicio.length < 3) {
      document.getElementById("lblMensaje").innerHTML =
        "La fecha inicio no tiene el formato correcto";
      $("#modalCenter").modal("show");
      return;
    }
    let fechaInicio = new Date(
      splitFechaInicio[0],
      splitFechaInicio[1] - 1,
      splitFechaInicio[2]
    );

    let splitFechaEntrega = fechaEntregaProyecto.split("-");
    if (splitFechaInicio.length < 3) {
      document.getElementById("lblMensaje").innerHTML =
        "La fecha de entrega no tiene el formato correcto";
      $("#modalCenter").modal("show");
      return;
    }
    let fechaEntrega = new Date(
      splitFechaEntrega[0],
      splitFechaEntrega[1] - 1,
      splitFechaEntrega[2]
    );

    if (fechaInicio.getTime() > fechaEntrega.getTime()) {
      document.getElementById("lblMensaje").innerHTML =
        "La fecha de inicio debe ser menor o igual a la fecha de entrega";
      $("#modalCenter").modal("show");
      return;
    }

    Meteor.call(
      "proyectos.insert",
      nombreProyecto,
      descripcionProyecto,
      responsable,
      fechaInicio,
      fechaEntrega,
      estadoProyecto
    );

    ReactDOM.findDOMNode(this.refs.inputNombreProyecto).value = "";
    ReactDOM.findDOMNode(this.refs.inputDescripcionProyecto).value = "";
    ReactDOM.findDOMNode(this.refs.inputFechaInicioProyecto).value = "";
    ReactDOM.findDOMNode(this.refs.inputFechaEntregaProyecto).value = "";
  }

  handleSubmitCrearTarea(event) {
    event.preventDefault();

    const nombreTarea = ReactDOM.findDOMNode(this.refs.inputNombreTarea).value;
    const descripcionTarea = ReactDOM.findDOMNode(
      this.refs.inputDescripcionTarea
    ).value;
    const prioridadTarea = ReactDOM.findDOMNode(this.refs.inputPrioridadTarea)
      .value;

    const fechaCreacionTarea = ReactDOM.findDOMNode(
      this.refs.inputFechaCreacionTarea
    ).value;

    if (
      !(
        nombreTarea != "" &&
        descripcionTarea != "" &&
        prioridadTarea != "" &&
        fechaCreacionTarea != ""
      )
    ) {
      document.getElementById("lblMensaje").innerHTML =
        "Se deben diligenciar todos los campos para crear la tarea";
      $("#modalCenter").modal("show");
      return;
    }

    let splitFechaCreacion = fechaCreacionTarea.split("-");
    let fechaCreacion = new Date(
      splitFechaCreacion[0],
      splitFechaCreacion[1] - 1,
      splitFechaCreacion[2]
    );

    let tareaEncontrada = coleccionProyectos.findOne({
      "tareas.nombre": nombreTarea,
      _id: this.state.proyectoDetalle._id
    });

    if (tareaEncontrada) {
      document.getElementById("lblMensaje").innerHTML =
        "Ya existe una tarea con este nombre, no se puede agregar";
      $("#modalCenter").modal("show");
      return;
    }

    Meteor.call(
      "tareas.insert",
      this.state.proyectoDetalle._id,
      nombreTarea,
      descripcionTarea,
      prioridadTarea,
      fechaCreacion
    );

    ReactDOM.findDOMNode(this.refs.inputNombreTarea).value = "";
    ReactDOM.findDOMNode(this.refs.inputDescripcionTarea).value = "";
    ReactDOM.findDOMNode(this.refs.inputPrioridadTarea).value = "";
    ReactDOM.findDOMNode(this.refs.inputFechaCreacionTarea).value = "";

    this.setState({
      proyectoDetalle: coleccionProyectos.findOne({
        _id: this.state.proyectoDetalle._id
      })
    });
  }

  handleBusquedaProyecto(event) {
    event.preventDefault();

    const nombreFiltro = ReactDOM.findDOMNode(this.refs.inputFiltroNombre)
      .value;

    if (nombreFiltro == "") {
      document.getElementById("lblMensaje").innerHTML =
        "No se puede dejar el campo en blanco";
      $("#modalCenter").modal("show");
      return;
    }

    this.setState({
      nombreProyectoFiltro: nombreFiltro
    });
  }

  handleMostrarProyectos(event) {
    event.preventDefault();

    this.setState({
      nombreProyectoFiltro: null
    });

    ReactDOM.findDOMNode(this.refs.inputFiltroNombre).value = "";
  }

  renderTasks() {
    if (this.state.nombreProyectoFiltro == null) {
      return this.props.proyectos.map(proyecto => (
        <ProyectoJS
          key={proyecto._id}
          proyecto={proyecto}
          onClickItem={this.handleTareasProyecto.bind(this)}
        />
      ));
    } else {
      let proyectosFiltrados = this.props.proyectos.filter(
        proyecto => proyecto.nombre == this.state.nombreProyectoFiltro
      );

      return proyectosFiltrados.map(proyecto => (
        <ProyectoJS
          key={proyecto._id}
          proyecto={proyecto}
          onClickItem={this.handleTareasProyecto.bind(this)}
        />
      ));
    }
  }

  handleLogOut(event) {
    event.preventDefault();

    sessionStorage.removeItem("usuario");

    window.location.replace("/");
  }

  renderTareas() {
    if (this.state.proyectoDetalle === null) {
      return (
        <tr>
          <th colSpan="4">
            No hay tareas para mostrar, por favor seleccione un proyecto
          </th>
        </tr>
      );
    } else if (!this.state.proyectoDetalle.tareas) {
      document.getElementById("botonAgregarTarea").disabled = false;
      document.getElementById("inputNombreTarea").disabled = false;
      document.getElementById("inputDescripcionTarea").disabled = false;
      document.getElementById("inputPrioridadTarea").disabled = false;
      document.getElementById("inputFechaCreacionTarea").disabled = false;
      document.getElementById("lblAgregarTarea").innerHTML =
        "Agregar tarea al proyecto " + this.state.proyectoDetalle.nombre;
      return (
        <tr>
          <th colSpan="4">
            No hay tareas para el proyecto {this.state.proyectoDetalle.nombre}
          </th>
        </tr>
      );
    } else {
      document.getElementById("botonAgregarTarea").disabled = false;
      document.getElementById("inputNombreTarea").disabled = false;
      document.getElementById("inputDescripcionTarea").disabled = false;
      document.getElementById("inputPrioridadTarea").disabled = false;
      document.getElementById("inputFechaCreacionTarea").disabled = false;
      document.getElementById("lblAgregarTarea").innerHTML =
        "Agregar tarea al proyecto " + this.state.proyectoDetalle.nombre;
      return this.state.proyectoDetalle.tareas.map(tarea => (
        <TareaJS key={tarea.nombre} tarea={tarea} />
      ));
    }
  }

  handleTareasProyecto(proyecto) {
    this.setState({
      proyectoDetalle: proyecto
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm">
            <div className="container-fluid">
              <h3>Proyectos</h3>

              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Responsable</th>
                    <th scope="col">Fecha de Inicio</th>
                    <th scope="col">Fecha de Entrega</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Ver tareas</th>
                  </tr>
                </thead>
                <tbody>{this.renderTasks()}</tbody>
              </table>

              <h4>Agregar Proyecto</h4>

              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group row">
                  <label
                    htmlFor="inputNombreProyecto"
                    className="col-sm-2 col-form-label"
                  >
                    Nombre
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      ref="inputNombreProyecto"
                      id="inputNombreProyecto"
                      placeholder="Nombre del proyecto"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputDescripcionProyecto"
                    className="col-sm-2 col-form-label"
                  >
                    Descripcion
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      ref="inputDescripcionProyecto"
                      id="inputDescripcionProyecto"
                      placeholder="Descripcion del proyecto"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputFechaInicioProyecto"
                    className="col-sm-2 col-form-label"
                  >
                    Fecha Inicio
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="date"
                      className="form-control"
                      id="inputFechaInicioProyecto"
                      ref="inputFechaInicioProyecto"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputFechaEntregaProyecto"
                    className="col-sm-2 col-form-label"
                  >
                    Fecha Entrega
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="date"
                      className="form-control"
                      id="inputFechaEntregaProyecto"
                      ref="inputFechaEntregaProyecto"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputEstadoProyecto"
                    className="col-sm-2 col-form-label"
                  >
                    Estado
                  </label>
                  <div className="col-sm-10">
                    <select
                      className="form-control"
                      id="inputEstadoProyecto"
                      ref="inputEstadoProyecto"
                    >
                      <option value="En Progreso">En Progreso</option>
                      <option value="Terminado">Terminado</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary">
                      Agregar proyecto
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm">
            <h3>Tareas</h3>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Descripcion</th>
                  <th scope="col">Prioridad</th>
                  <th scope="col">Fecha Creacion</th>
                </tr>
              </thead>
              <tbody>{this.renderTareas()}</tbody>
            </table>

            <h4>
              <label id="lblAgregarTarea">Agregar tarea al proyecto</label>
            </h4>

            <form onSubmit={this.handleSubmitCrearTarea.bind(this)}>
              <div className="form-group row">
                <label
                  htmlFor="inputNombreTarea"
                  className="col-sm-2 col-form-label"
                >
                  Nombre
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    ref="inputNombreTarea"
                    id="inputNombreTarea"
                    placeholder="Nombre de la tarea"
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputDescripcionTarea"
                  className="col-sm-2 col-form-label"
                >
                  Descripcion
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    ref="inputDescripcionTarea"
                    id="inputDescripcionTarea"
                    placeholder="Descripcion de la tarea"
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputPrioridadTarea"
                  className="col-sm-2 col-form-label"
                >
                  Prioridad
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    ref="inputPrioridadTarea"
                    id="inputPrioridadTarea"
                    placeholder="Prioridad de la tarea"
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputFechaCreacionTarea"
                  className="col-sm-2 col-form-label"
                >
                  Fecha Creacion
                </label>
                <div className="col-sm-10">
                  <input
                    type="date"
                    className="form-control"
                    id="inputFechaCreacionTarea"
                    ref="inputFechaCreacionTarea"
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-10">
                  <button
                    id="botonAgregarTarea"
                    type="submit"
                    className="btn btn-primary"
                    disabled
                  >
                    Agregar tarea
                  </button>
                </div>
              </div>
            </form>
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
    proyectos: coleccionProyectos
      .find({ responsable: sessionStorage.getItem("usuario") })
      .fetch()
  };
})(Tournaments);

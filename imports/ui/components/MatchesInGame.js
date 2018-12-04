import React, { Component } from "react";
import MatchList from "./MatchList";
import {coleccionTorneos} from "../../api/db.js";
import { withTracker } from 'meteor/react-meteor-data';
import TournamentOptions from "./TournamentOptions";

class MatchesInGame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opcion: "",
      opcionesTorneos: [],
    };
    this.cambiarTorneo = this.cambiarTorneo.bind(this);
    console.log(this.state.opcionesTorneos);
  }

  renderOptions() {
    return this.props.opcionesTorneos.map(option => (
      <option key={option.nombre} name="opcion">
        {option.nombre}
      </option>
    ));
  }

  cambiarTorneo(e) {
    this.setState({opcion: e.target.value});
    let consulta = coleccionTorneos.find({tablaRetos:[]}).fetch();
    console.log(consulta);
  }
  
  render() {
    return (
      <form>
        <div>
          <div className="row justify-content-center banner">
            <div className="col-">
              <h1 className="my-5">Partidas en juego</h1>
            </div>
          </div>
          <div className="row justify-content-start">
            <div id="div-comboBox" className="col-md-4">
              <select id="comboBox" className="my-4" onChange={this.cambiarTorneo}>
                {this.renderOptions()}
              </select>
            </div>
          </div>
          <div className="row justify-content-center">
             <div className="col-md-12">
              <MatchList
              matches={this.props.matches}/>
             </div>
          </div>
        </div>
      </form>
    );
  }

}
export default withTracker(() => {
  return {
    matches: coleccionTorneos.find({}).fetch(),
    opcionesTorneos: coleccionTorneos.find({}).fetch()
  };
})(MatchesInGame);

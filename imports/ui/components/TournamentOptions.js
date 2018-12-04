import React, { Component } from "react";

class TournamentOptions extends Component {

    /*
    Props de este componente:
        option: representa un torneo del cual se puede ver los retos.
    */
  render() {
    return (
      <option value={this.props.option.nombre}>
        {this.props.option.nombre}
      </option>
    );
  }

}
export default TournamentOptions;

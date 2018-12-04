import React, { Component } from "react";
import MatchItem from "./MatchItem";

class MatchList extends Component {

    /*
    Props de este componente:
        matches: representa las partidas en juego.
    */

    renderMatchItems() {
        return this.props.matches.map(m => (<MatchItem key={m._id} match={m}/>));
    }
  
  render() {
      return (
            <div>
                {this.renderMatchItems()}
            </div>
        );
    }

}
export default MatchList;

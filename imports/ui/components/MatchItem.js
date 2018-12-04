import React, { Component } from "react";

class MatchItem extends Component {

  /*
  Props de este componente:
    key: es el identificador del componente
    match: es la partida en juego que se aloja en el item
  */
  
  render() {
    return(
      <div className="row justify-content-center my-2 listItem">
        <div className="col-md-4">
          <div className="row my-3">
            <div className="col-">
              <label>{this.props.match.challenger} VS. {this.props.match.challenged}</label>
            </div>
          </div>
        </div>
        <div className="col-md-4 my-1">
          <div className="row justify-content-center">
            <div className="col-">
              <button className="btn btn-primary" style={{width: 130 + 'px'}}>Gana {this.props.match.challenger}</button>
            </div>
          </div>
          <div className="row justify-content-center my-1">
            <div className="col-">
              <button className="btn btn-warning form-control" style={{width: 130 + 'px'}}>Tablas!</button>
            </div>
          </div>
          <div className="row justify-content-center my-1">
            <div className="col-">
              <button className="btn btn-primary" style={{width: 130 + 'px'}}>Gana {this.props.match.challenged}</button>
           </div>
          </div>
        </div>
      </div>
    );
  }

}
export default MatchItem;

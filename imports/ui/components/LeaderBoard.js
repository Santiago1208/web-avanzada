import React, {Component} from 'react';
import BoardItem from './BoardItem.js';

class LeaderBoard extends Component {
    
    /*
		Props de este componente:
			leaderBoard: listado de las posiciones de los jugadores
    */

    renderBoardItems() {
    	return this.props.leaderBoard.map(p => (<BoardItem key={p.position} participant={p}/>));
    }

    render() {
   	 return (
   	 	<table className="table table-hover">
				<thead>
          <tr>
            <th scope="col">Posición</th>
            <th scope="col">Participante</th>
            <th scope="col">Nivel de juego</th>
          </tr>
        </thead>
        <tbody>{this.renderBoardItems()}</tbody>
      </table>
   	 );
    }
}
export default LeaderBoard;
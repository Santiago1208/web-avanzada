import React, {Component} from 'react';

class BoardItem extends Component {

	/*
	Props de este componente
		key: es igual a la posición que tiene el participante que este componente representa.
		participant: es el participante que aloja este item.
	*/

    render() {
   	 return (
   	 	<tr>
        <th>{this.props.participant.position}</th>
        <th>{this.props.participant.name}</th>
        <th>{this.props.participant.level}</th>
      </tr>
   	 );
    }
}
export default BoardItem;
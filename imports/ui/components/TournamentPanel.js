import React, {Component} from 'react';
import TournamentItem from './TournamentItem.js';

class TournamentPanel extends Component {
	/*
	props de este componente:
		tournaments: torneos que se van a renderizar en la lista
	*/
    renderTournaments() {
    	console.log(this.props.tournaments);
    	return (
    		this.props.tournaments.map(t => (<TournamentItem key={t.id} tournament={t}/>))
    	);
    }

    render() {
   	 return (
   	 	<div className="col-sm-4 col-md-4 col-lg-4">
   	 	  <div className="row subtitle">
   	 	  	<h3>Torneos Activos</h3>
   	 	  </div>
   	 	  {this.renderTournaments()}
   	 	</div>
   	 );
    }
}
export default TournamentPanel;
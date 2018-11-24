import React, {Component} from 'react';

class TournamentItem extends Component {
	/*
	props de este componente:
		tournament: torneo activos que va a renderizar.
			tournament tiene: id, name
	*/
    render() {
    	console.log(this.props.tournament.name);
   	 return (
   	 	<div>
   	 	  <form>
   	 	  	<div className="row listContent">
   	 	  		<div className="col-sm-6 col-md-6 col-lg-6 listItem">
   	 	  			<a href="https://www.google.com" className="listContent">{this.props.tournament.name}</a>
   	 	  		</div>
   	 	  	</div>
   	 	  	<div className="row">
   	 	  		<div className="col-sm-2 col-md-2 col-lg-2">
   	 	  			<button className="btn btn-primary"><i className="fas fa-user-plus"/>Unirse</button>
   	 	  		</div>
   	 	  		<div className="col-sm-2 col-md-2 col-lg-2">
   	 	  			<button className="btn btn-primary"><i className="fas fa-chart-bar"/>Estadísticas</button>
   	 	  		</div>
   	 	  	</div>
   	 	  </form>
   	 	</div>
   	 );
    }
}
export default TournamentItem;
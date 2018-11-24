import React, {Component} from 'react';
import TournamentPanel from './TournamentPanel.js';
import LeaderBoard from './LeaderBoard.js';

class ParticipantDashBoard extends Component {
    render() {
   	 return (
   	 	<div>
   	 	  <div className="col-sm-12 col-md-12 col-lg-12 rankingBanner">
   	 	  	<h1>DashBoard</h1>
   	 	  </div>
   	 	  <div>
   	 	  	<div className="row">
   	 	  		<div className="col-sm-4 col-md-4 col-lg-4 prueba">
              <TournamentPanel tournaments={[{id:1, name: "Torneo 1"}, {id:2, name: "Torneo 2"}]}/>
            </div>
   	 	  		<div className="col-sm-8 col-md-8 col-lg-8">
   	 	  			<LeaderBoard leaderBoard={[{position:1, name: "Santiago Restrepo", level:"Novato"}, {position:2, name: "Daniel Ocampo", level:"Novato"}]}/>
   	 	  		</div>
   	 	  	</div>
   	 	  </div>
   	 	</div>
   	 );
    }
}
export default ParticipantDashBoard;
import React, {Component} from 'react';
import Menu from './Menu.js';
import ParticipantProfile from './ParticipantProfile.js';
import ParticipantRegistering from './ParticipantRegistering.js';
import ParticipantDashBoard from './ParticipantDashBoard.js';

class Ranking extends Component {
    render() {
   	 return (
   	 	<div className="row" id="app">
   	 	  <div className="col-sm-2 col-md-2" id="menu">
   	 	  	<Menu/>
   	 	  </div>
   	 	  <div className="col-sm-10 col-md-10" id="content">
   	 	  	<ParticipantDashBoard/>
   	 	  </div>
   	 	</div>
   	 );
    }
}
export default Ranking;

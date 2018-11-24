import React, {Component} from 'react';
import ParticipantRegisteringForm from './ParticipantRegisteringForm.js';

class ParticipantRegistering extends Component {
    render() {
   	 return (
   	 	<div>
   	 		<div className="row justify-content-center rankingBanner">
   	 			<h1>Registro participantes</h1>
   	 		</div>
   	 		<div className="container">
   	 	  	<ParticipantRegisteringForm/>
   	 		</div>
   	 	</div>
   	 );
    }
}
export default ParticipantRegistering;
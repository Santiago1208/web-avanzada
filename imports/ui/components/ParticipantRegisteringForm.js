import React, {Component} from 'react';

class ParticipantRegisteringForm extends Component {
    render() {
   	 return (
   	 	<div className="container">
	   	 	<form>
	   	 		<div className="row">
	   	 	  	<div className="col-sm-4 col-md-4 col-lg-4">
	   	 	  		<label htmlFor="participantCode">Código:</label>
	   	 	  		<input type="text" id="participantCode" className="form-control"/>
	   	 	  	</div>
	   	 	  </div>
	   	 	  <div className="row">
	   	 	  	<div className="col-sm-4 col-md-4 col-lg-4">
	   	 	  		<label htmlFor="participantName">Nombre:</label>
	   	 	  		<input type="text" id="participantName" className="form-control"/>
	   	 	  	</div>
	   	 	  </div>
	   	 	  <div className="row justify-content-center">
	   	 	  	<div className="col-sm-4 col-md-4 col-lg-4">
							<button className="btn btn-success">Registrar</button>
	   	 	  	</div>
	   	 	  </div>
	   	 	</form>
   	 	</div>
   	 );
    }
}
export default ParticipantRegisteringForm;
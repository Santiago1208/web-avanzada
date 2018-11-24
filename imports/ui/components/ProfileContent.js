import React, {Component} from 'react';

class ProfileContent extends Component {
		/*
			Props de este componente:
				ownerCode: String
				ownerName: String
				ownerAge: int
		*/
    render() {
   	 return (
   	 	<div>
   	 		<form id="profileContentForm">
   	 			<div className="row">
	   	 	  	<div className="col-md-12 col-sm-12 col-lg-12">
	   	 	  		<label htmlFor="ownerCode">Código:</label>
	   	 	  		<input id="ownerCode" className="form-control" type="text" value={this.props.ownerCode} readOnly={true}/>
	   	 	  	</div>
	   	 	  </div>

	   	 	  <div className="row">
	   	 	  	<div className="col-md-12 col-sm-12 col-lg-12">
	   	 	  		<label htmlFor="ownerName">Nombre:</label>
	   	 	  		<input id="ownerName" className="form-control" type="text" value={this.props.ownerName} readOnly={true}/>
	   	 	  	</div>
	   	 	  </div>

	   	 	  <div className="row">
	   	 	  	<div className="col-md-12 col-sm-12 col-lg-12">
	   	 	  		<label htmlFor="ownerAge">Edad:</label>
	   	 	  		<input id="ownerAge" className="form-control" type="text" value={this.props.ownerAge} readOnly={true}/>
	   	 	  	</div>
	   	 	  </div>

	   	 	  <div className="row justify-content-center">
	   	 	  	<div className="col-md-4 col-sm-4 col-lg-4">
	   	 	  		<button className="btn btn-primary">Estadísticas</button>
	   	 	  	</div>
	   	 	  	<div className="col-md-4 col-sm-4 col-lg-4">
	   	 	  		<button id="btnAtras" className="btn btn-danger">Atrás</button>
	   	 	  	</div>
	   	 	  </div>
   	 		</form>

   	 	</div>
   	 );
    }
}
export default ProfileContent;
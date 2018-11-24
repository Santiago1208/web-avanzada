import React, {Component} from 'react';

import ProfileContent from './ProfileContent.js';

class ParticipantProfile extends Component {
	render() {
		return (
				<div>
					<div className="row justify-content-center rankingBanner">
						<h1>Perfil</h1>
					</div>

					<div className="row justify-content-center">
						<div className="col-md-3 col-sm-3 col align-self-center" id="profilePhoto">
							<img src="./images/anonymous-user.png" alt="foto de perfil" />
						</div>
						<div className="col-md-4 col-sm-4" id="profileContent">
							<ProfileContent ownerCode="A00018284" ownerName="Santiago Restrepo" ownerAge="21"/>
						</div>
					</div>

				</div>
			);
	}
}
export default ParticipantProfile;
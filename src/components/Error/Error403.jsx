import React from 'react';

const Error403 = (props) => {
	return (
		<div className="error">
			<div className="error-code m-b-10 m-t-20">401 <i className="fa fa-warning"></i></div>
			<h3 className="font-bold">Unauthorized</h3>

			<div className="error-desc">
				Sorry, you are unauthorized to access these web app <br/>
				<div>
					<a className=" login-detail-panel-button btn" href="/">
							<i className="fa fa-arrow-left"></i>
							Go back to Homepage                        
						</a>
				</div>
			</div>
			</div>
	);	
} 


export default Error403;
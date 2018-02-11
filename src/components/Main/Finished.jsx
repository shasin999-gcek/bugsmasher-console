import React from 'react';

const styles = {
	modal: {
		display: 'block',
		textAlign: 'center',
		fontSize: '25px',
		position: 'relative',
    top: '50%',
    transform: 'translateY(50%)'
	},
	button: {
		fontSize: '20px',
		fontWeight: 'bold'
	}
}

const Finished = (props) => {
	return (
		<div>
			<div className="modal" style={styles.modal}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title" id="myModalLabel">
								<i style={{fontSize: '70px'}} className="material-icons">sentiment_very_satisfied</i>
							</h4>
						</div>
						<div className="modal-body">
						Thank you for participating<br /> <br />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Finished;
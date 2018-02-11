import React, { Component } from 'react';

// importing components
import Navigation from 'components/Navigation';
import { Row, Col, FormGroup, FormControl, InputGroup, HelpBlock, Button } from 'react-bootstrap';
import Loading from 'components/Loading/Loading';

// import auth helper
import auth from 'helpers/auth';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			no_of_players: 0,
			player_one_name: '',
			player_two_name: '',
			mobile_number: '',
			team_name: '',
			password: '',
			re_password: '',
			error_msgs: [],
			isNoOfPlayersValid: null,
			isPlayerOneNameValid: null,
			isPlayerTwoNameValid: null,
			isMobileNumberValid: null,
			isTeamNameValid: null,
			isPasswordValid: null,
			isRePasswordValid: null,
			isFormValid: null,
			loading: null
		}
	}
	

  handleInputChange(e) {
		const { name, value } = e.target;
    this.setState({ [name]: value }, () => this.validateField(name, value));
  }
	
	validateField(fieldName, value) {
		let {
			no_of_players,
			password,
			isNoOfPlayersValid,
			isPlayerOneNameValid,
			isPlayerTwoNameValid,
			isTeamNameValid,
			isMobileNumberValid,
			isPasswordValid,
			isRePasswordValid
		} = this.state;

		switch(fieldName) {
			case 'no_of_players':
				isNoOfPlayersValid = value !== 0;
				console.log(value === 1);
				isPlayerTwoNameValid = value === '1';
				break;
			case 'player_one_name':
				isPlayerOneNameValid = value.length > 0;
				break;
			case 'player_two_name':
				isPlayerTwoNameValid = (no_of_players === '2') ? value.length > 0 : true;
				break;
			case 'team_name':
				isTeamNameValid = value.length > 0 && !/[^a-zA-Z0-9]/.test(value);
				break;
			case 'mobile_number':
				isMobileNumberValid = value.length > 0 && !/[^0-9]/.test(value);
				break;
			case 'password':
				isPasswordValid = value.length >= 8;
				break;
			case 're_password':
				isRePasswordValid = value === password;
				break;
			default:
				console.error('UnKnown Form Field Name');					
		}

		this.setState({
			isNoOfPlayersValid,
			isPlayerOneNameValid,
			isPlayerTwoNameValid,
			isTeamNameValid,
			isMobileNumberValid,
			isPasswordValid,
			isRePasswordValid
		}, this.validateForm)
	}
	
	validateForm() {
		this.setState((prevState) => {
			return {
				isFormValid: (
					prevState.isNoOfPlayersValid
					 && prevState.isPlayerOneNameValid
					 && prevState.isPlayerTwoNameValid
					 && prevState.isTeamNameValid
					 && prevState.isMobileNumberValid
					 && prevState.isPasswordValid
					 && prevState.isRePasswordValid
				)
			}
		});
	}

	handleSubmit(e) {
		if(this.state.isFormValid) {

			// change view to loading state
			this.setState({ loading: true });

			// spread operator tto filter out re_password
			const {re_password, loading, ...rest} = this.state;

			// API call to register end point
			auth.register({...rest})
				.then(res => {
					// stop laoding
					this.setState({loading: false});

					// TODO: avoid logging and display to users
					if(res.data.err) {
						// handle Validation errors
						if(res.data.err.code === 11000) {
							console.log("Team name already taken.choose another name");
						} 

						if(res.data.errors) {
							this.setState({ error_msgs: res.data.errors });
						  res.data.errors.map(e => {
								var name = e.path.replace(e.path.substr(-2), '');
								var fieldIndex = this.props.formFields.findIndex(field => {
									return field.props.name === name;
								});
							
								this.props.formFields[fieldIndex].helpMsg = e.message;
								var validationState = this.props.formFields[fieldIndex].validationState;
								this.setState({[validationState]: false });
							});
						} 

					} else if(res.data.statusText === "OK") {
						this.props.history.push('/login');
					}

				})
				.catch(e => console.error(e));

		}
	}
	
	getValidationState(validationState) {
		if(this.state[validationState] === false)
			return "error";
		return null;	
	}
	
	render() {
		if(this.state.loading) {
			return <Loading loading={true} />
		}

 		return (
			<div>
				<Navigation />
				<div className="container">
					<Row>
						<Col md={4} mdOffset={4}>
							<h3 className="page-header">Please Register from here</h3>
							<form>
								<FormGroup>
									<FormControl
										componentClass="select" 
										name="no_of_players"
										value={this.state.no_of_players}
										onChange={this.handleInputChange.bind(this)}
										>
										<option value={0}>Choose Number of players</option>
										<option value={1}>One</option>
										<option value={2}>Two</option>
									</FormControl>
									<FormControl.Feedback />
								</FormGroup>
								{this.props.formFields.map(({ addonIcon, helpMsg, validationState, props }, index) => {
									if(this.state.no_of_players === '1' && props.name === 'player_two_name')
										return null; 	
									return (
										<FormGroup key={index} validationState={this.getValidationState(validationState)}>
											<InputGroup>
												<InputGroup.Addon>
													<i className="material-icons md-18">{addonIcon}</i>
												</InputGroup.Addon>
												<FormControl 
													value={this.state[props.name]}
													onChange={this.handleInputChange.bind(this)}
													{...props}
												/>
											</InputGroup>
											<FormControl.Feedback />
											{this.state[validationState] === false
												&& 	<HelpBlock>{ helpMsg }</HelpBlock>
											}
										</FormGroup>
									);
								})}
								<Button 
									type="button"
									bsStyle="success"
									onClick={this.handleSubmit.bind(this)}
									disabled={!this.state.isFormValid}
								>
									Register
								</Button>
							</form>
						</Col>
					</Row>	
				</div>
			</div>	
		);
	}
}

Register.defaultProps = {
	formFields: [
		{
			props: {
				name: 'player_one_name',
				type: 'text',
				placeholder: 'Player One Name'
			},
			validationState: "isPlayerOneNameValid",
			helpMsg: "Player1 Name is Required",
			addonIcon: 'face',
		},
		{
			props: {
				name: 'player_two_name',
				type: 'text',
				placeholder: 'Player Two Name',
			},
			validationState: "isPlayerTwoNameValid",
			helpMsg: "Player2 Name is Required",
			addonIcon: 'face'
		},
		{
			props: {
				name: 'mobile_number',
				type: 'number',
				placeholder: 'Contact Number',
			},
			validationState: "isMobileNumberValid",
			helpMsg: "Mobile Number is Required",
			addonIcon: 'phone'
		},
		{
			props: {
				name: 'team_name',
				type: 'text',
				placeholder: 'Team Name',
			},
			addonIcon: 'group',
			validationState: "isTeamNameValid",
			helpMsg: "Space and special characters are not allowed"
		},
		{
			props: {
				name: 'password',
				type: 'password',
				placeholder: 'Password',
			},
			addonIcon: 'lock',
			validationState: "isPasswordValid",
			helpMsg: "Atleast 8 characters"
		},
		{
			props: {
				name: 're_password',
				type: 'password',
				placeholder: 'Confirm Password',
			},
			validationState: "isRePasswordValid",
			helpMsg: "Password doesn't match",
			addonIcon: 'lock'
		}
	] 
}


export default Register;
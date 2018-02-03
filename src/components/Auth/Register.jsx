import React, { Component } from 'react';
import 'assets/css/validationBox.css';

// importing components
import { Row, Col, FormGroup, FormControl, InputGroup, Button, Alert } from 'react-bootstrap';
import { Card, Footer, Content } from './Reusable';
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
			isNoOfPlayersValid: false,
			isPlayerOneNameValid: false,
			isPlayerTwoNameValid: false,
			isMobileNumberValid: false,
			isTeamNameValid: false,
			isPasswordValid: false,
			isRePasswordValid: false,
			isFormValid: false,
			loading: false
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
						} 

					} else if(res.data.statusText === "OK") {
						this.props.history.push('/login');
					}

				})
				.catch(e => console.error(e));

		}
	}
	
	getValidationState(name) {
		if(!this.state[name].length) {
			return "error";
		}
		return null;
	}
	
	render() {
		if(this.state.loading) {
			return <Loading loading={true} />
		}

 		return (
			<Row>
				<Col md={8}>
					{
						this.state.error_msgs.map(msg => {
							return (
								<Alert bsStyle="danger" style={{margin: 'auto', width: '500px'}}>
									<div className="container-fluid">
									  <div className="alert-icon">
											<i className="material-icons">warning</i>
									  </div>
								      <b>{msg.message}</b> 
								    </div>
								</Alert> 
							)
						})
					}
					<Card style={{marginTop: "20px"}}>
						<Content>
							<InputGroup>
								<InputGroup.Addon>
									<i className="material-icons">group</i>
								</InputGroup.Addon>
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
								</FormGroup>
							</InputGroup>
							{this.props.formFields.map(({ addonIcon, props }, index) => {
								if(this.state.no_of_players === '1' && props.name === 'player_two_name')
									return null; 	
								return (
									<InputGroup key={index}>
										<InputGroup.Addon>
											<i className="material-icons">{addonIcon}</i>
										</InputGroup.Addon>
										<FormGroup validationState={this.getValidationState(props.name)}>
											<FormControl 
												value={this.state[props.name]}
												onChange={this.handleInputChange.bind(this)}
												{...props}
											/>
											<FormControl.Feedback />
										</FormGroup>
									</InputGroup>
								);
							})}
						</Content>
						<Footer>
							<Button 
								type="button"
								bsStyle="success"
								onClick={this.handleSubmit.bind(this)}
								disabled={!this.state.isFormValid}
							>
								Sign Up
							</Button>
						</Footer>
					</Card>
				</Col>
				<Col md={3}>
					<div className="aro-pswd_info">
						<div id="pswd_info">
							<h4>Requirements</h4>
							<ul>
								<li className={this.state.isFormValid ? "valid" : "invalid"}>Every fields are mandatory</li>
								<li className={this.state.isNoOfPlayersValid ? "valid" : "invalid"}>Can have atmost two players</li>
								<li className={this.state.isTeamNameValid ? "valid" : "invalid"}>Team name must not contain any spaces and special characters</li>
								<li className={this.state.isPasswordValid ? "valid" : "invalid"}>Password Be at least <strong>8 characters</strong></li>
							</ul>
						</div>
					</div>
				</Col>	
			</Row>
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
			addonIcon: 'face',
		},
		{
			props: {
				name: 'player_two_name',
				type: 'text',
				placeholder: 'Player Two Name'
			},
			addonIcon: 'face'
		},
		{
			props: {
				name: 'mobile_number',
				type: 'number',
				placeholder: 'Contact Number'
			},
			addonIcon: 'phone'
		},
		{
			props: {
				name: 'team_name',
				type: 'text',
				placeholder: 'Team Name'
			},
			addonIcon: 'group'
		},
		{
			props: {
				name: 'password',
				type: 'password',
				placeholder: 'Password'
			},
			addonIcon: 'lock'
		},
		{
			props: {
				name: 're_password',
				type: 'password',
				placeholder: 'Confirm Password'
			},
			addonIcon: 'lock'
		}
	] 
}


export default Register;
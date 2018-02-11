import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { bake_cookie } from 'sfcookies';

import { InputGroup, FormGroup, FormControl, Button,Alert } from 'react-bootstrap';
import { Header, Card, Content, Footer } from './Reusable';
import Loading from 'components/Loading/Loading';
import Navigation from 'components/Navigation';

import { logIn } from 'actions';
import auth from 'helpers/auth';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			team_name: '',
			password: '',
			error_msg: null,
			loading: false
		}
	}
	
	handleInputChange(e) {
		const { name, value } = e.target;
		this.setState({[name]: value});
	}
	
	validateForm() {
		if(!this.state.team_name.length) {
			alert("Team name is required");
			return false;
		} 
		
		if(!this.state.password.length) {
			alert("password is required");
			return false;
		} 
		return true;
	}

	handleSubmit() {
		if(this.validateForm()) {
			this.setState({ loading: true });

			auth.login(this.state)
			.then(res => {
				this.setState({ loading: false });
				
				if(res.data.status !== 200) {
					this.setState({ error_msg: res.data.message });
				} else {
					// this.props.logIn(res.data.team_name, res.data.token);
					bake_cookie('token', res.data.token);
					// axios.defaults.headers.common['Authorization'] = 'JWT ' + read_cookie('token');
					// this.props.history.push('/app/language');
					window.location ="/app/language";
				}
			});
		}
	}
	
	render() {
		if(this.state.loading) {
			return <Loading loading={true} />
		}

		return (
			<div>
				<Navigation />
				{
					this.state.error_msg && (
						<Alert bsStyle="danger" className="col-md-4 col-md-offset-4">
							<strong>{this.state.error_msg}</strong>
						</Alert>
				)}
				<Card style={{marginTop: "100px"}}>
					<Header style={{
				    fontFamily: 'Quicksand',
				    fontWeight: 'bold',
				    fontSize: '20px',
					}}>
						<h3 className="page-header text-primary">Login</h3>
					</Header>
					<Content style={{marginTop: "30px"}}>
						{this.props.formFields.map((formField, index) => {
							return (
								<FormGroup key={index}>
									<InputGroup>
										<InputGroup.Addon>
											<i className="material-icons md-18">{formField.addonIcon}</i>
										</InputGroup.Addon>
										<FormControl
											type={formField.type}
											name={formField.name}
											placeholder={formField.placeholder}
											value={this.state[formField.name]}
											onChange={this.handleInputChange.bind(this)}
											required
										/>
									</InputGroup>
								</FormGroup>
							);
						})}
					</Content>
					<Footer>
						<Button 
							type="button"
							bsStyle="success"
							className="btn-round"
							onClick={this.handleSubmit.bind(this)}
						>
							Login
						</Button>
					</Footer>
				</Card>
			</div>
		);
	}
}

Login.defaultProps = {
	formFields: [
		{
			name: 'team_name',
			type: 'text',
			addonIcon: 'group',
			placeholder: 'Team Name'
		},
		{
			name: 'password',
			type: 'password',
			addonIcon: 'lock',
			placeholder: 'password'
		}
	]
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ logIn }, dispatch);
} 

const mapStateToProps = (state) => {
	return {
		team: state
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);



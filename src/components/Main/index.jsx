import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';

import { setContestDetails } from 'actions';

// importing stylesheets
import "assets/css/console.css";
import "assets/css/material-kit.css";
import "assets/css/bootstrap-overrides.css";


// importing necessary components
import Loading from 'components/Loading/Loading';
import Navigation from 'components/Navigation';
import Sidebar from 'components/Navigation/Sidebar';
import Editor from './Editor';
import Result from './Result';

import app from 'helpers/app';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: [],
			settings: {},
			selectedLevel: 1,
			selectedQuestion: '',
			resultStatus: [],
			loading: true
		};

		this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnSubmitCode = this.handleOnSubmitCode.bind(this);
	}

  handleOnSubmitCode(code) {
		this.setState({ loading: true });
    app.submitCode(this.state.selectedLevel, code, Date.now())
    	.then(res => {
				this.setState((prevState) => {
					// updating questions
					var questions = prevState.questions.slice();
					var selectedQuesIndex = questions.findIndex(q => q.info.level === prevState.selectedLevel);
					questions[selectedQuesIndex].contents = code;

					// updating result status
					var resultStatus = prevState.resultStatus.slice();
					var foundedIndex = resultStatus.findIndex((rstat) => rstat.level === prevState.selectedLevel);
					if(foundedIndex === -1) {
						resultStatus.push({ 
							level: prevState.selectedLevel,
							isAccepted: (!res.data.compileErrors) ? true : false
						})
					} else {
						resultStatus[foundedIndex].level = prevState.selectedLevel;
						resultStatus[foundedIndex].isAccepted = (!res.data.compileErrors) ? true : false;
					}
					return { resultStatus, questions, loading: false };
				});
			});
  }

	componentDidMount() {
		app.getAllInfo()
			.then(data => {
				this.setState({ 
					questions: data[0].questions,
					settings: data[1],
					startTime: data[0].startTime,
					loading: false 
				});
			});
	}

	componentWillUpdate(nextProps, nextState) {
		this.props.setContestDetails(nextState);
	}

	handleOnClick(level) {
		this.setState({ selectedLevel: level });
	}

  render () {
		var { resultStatus, selectedLevel } = this.state;
		var result = resultStatus.find(v => v.level === selectedLevel);

  	if(this.state.loading) {
  		return <Loading loading={true} />
  	}

    return (
			<div>
				<Navigation>
					<Sidebar 
						problems={this.state.questions} 
						selectLevel={this.handleOnClick} 
					/>
				</Navigation>
				<div className="body-content">
					<Row>
						<Col md={9}>
							<Editor
								selectedQuestion={this.state.selectedQuestion}
                submitCode={this.handleOnSubmitCode} 
							/>
						</Col>
						<Col md={3}>
							<Result
								result={result}
								startTime={this.state.startTime}
								duration={this.state.settings.time_duration}
								history={this.props.history}
							/>
						</Col>
					</Row>
				</div>
			</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contestDetails: state.contestDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setContestDetails }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

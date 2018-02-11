import React from 'react'
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

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
		this.handleOnChangeQuestionContents = this.handleOnChangeQuestionContents.bind(this);
	}

	selectQuestion() {
		var selectedQuestion = this.state.questions.find(question => {
			return question.info.level === this.state.selectedLevel
		});
		this.setState({ selectedQuestion });
	}

	handleOnChangeQuestionContents(code) {
		// updating questions
		var questions = this.state.questions.slice();
		var selectedQuesIndex = questions.findIndex(q => q.info.level === this.state.selectedLevel);
		questions[selectedQuesIndex].contents = code;
		this.setState({ questions }, () => 	this.selectQuestion());
	}

  handleOnSubmitCode() {
		this.setState({ loading: true });
    app.submitCode(this.state.selectedLevel, this.state.selectedQuestion.contents, Date.now())
    	.then(res => {
				this.setState((prevState) => {
				
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
					return { resultStatus, loading: false };
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
				}, () => this.selectQuestion());
			});
	}

	// componentWillUpdate(nextProps, nextState) {
	// 	this.props.setContestDetails(nextState);
	// }

	handleOnClick(level) {
		this.setState({ selectedLevel: level }, () => this.selectQuestion());
	}

  render () {
		var { resultStatus, selectedLevel } = this.state;
		var result = resultStatus.find(v => v.level === selectedLevel);

  	if(this.state.loading) {
  		return <Loading loading={true} />
  	}

    return (
			<div>
				<Navigation team={this.props.team} isAuthenticated/>
					<Row>
						<Col md={2}>
							<Sidebar 
								problems={this.state.questions} 
								selectedLevel={this.state.selectedLevel}
								selectLevel={this.handleOnClick} 
							/>
						</Col>
						<Col md={8}>
							<Editor
								selectedQuestion={this.state.selectedQuestion}
								saveCode={this.handleOnChangeQuestionContents}
								submitCode={this.handleOnSubmitCode} 
							/>
						</Col>
						<Col md={2}>
							<Result
								result={result}
								startTime={this.state.startTime}
								duration={this.state.settings.time_duration}
								history={this.props.history}
							/>
						</Col>
					</Row>
			</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    team: state.team
  }
}

export default connect(mapStateToProps, null)(Main);

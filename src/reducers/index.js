import { combineReducers } from 'redux';
import { SET_LOGGED_IN_TEAM, SET_LANGUAGE, SET_CONTEST_DETAILS } from '../constants';

const team = {
	team_name: '',
	token: ''
};

const signInReducer = (state=team, action) => {
	let newTeam = {...state};
	switch(action.type) {
		
		case SET_LOGGED_IN_TEAM:
			newTeam.team_name = action.team_name;
			newTeam.token = action.token;
			return newTeam;

		default:
			return state;
	}
}


const languageReducer = (state='', action) => {
	let newLanguage = {...state};

	switch(action.type) {
		case SET_LANGUAGE:
			newLanguage = action.language;
			return newLanguage;
		default:
			return state;	
	}
}

const contestReducer = (state={}, action) => {
	let newContestDetails = {...state};
	switch(action.type) {
		case SET_CONTEST_DETAILS:
			newContestDetails = action.contestDetails;
			const { questions, selectedLevel } = newContestDetails;

			if(selectedLevel > 0) {
		      newContestDetails.selectedQuestion = questions.find(question => {
		        return question.info.level === selectedLevel
		      });
		    }
		    
			return newContestDetails;
		default:
			return state;	
	}
}

const reducer = combineReducers({ 
	team: signInReducer,
	language: languageReducer,
	contestDetails: contestReducer
});

export default reducer;
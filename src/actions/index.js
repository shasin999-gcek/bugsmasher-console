import { SET_LOGGED_IN_TEAM, SET_LANGUAGE, SET_CONTEST_DETAILS } from '../constants';


export const logIn = (team_name, token) => {
	return {
		type: SET_LOGGED_IN_TEAM,
		team_name,
		token
	}
}


export const setLanguage = (language) => {
	return {
		type: SET_LANGUAGE,
		language
	}
}

export const setContestDetails = (contestDetails) => {
	return {
		type: SET_CONTEST_DETAILS,
		contestDetails
	}
}
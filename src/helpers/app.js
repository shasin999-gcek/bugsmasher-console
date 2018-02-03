import axios from 'axios';

const { protocol, hostname } = window.location;
const url = protocol + '//' + hostname + ':8080/api';


function handleError(e) {
	console.error(e);
	return null;
}

function getSettings() {
	return axios.get(url + '/settings').catch(e => handleError(e));
}

function getQuestions() {
	return axios.get(url + '/questions').catch(e => handleError(e));
}


export default {

	submitCode: function(level, code, submissionTime) {
		return axios.post(url + '/code', { level, code, submissionTime})
			.catch(e => handleError(e));
	},

	set_start_time: function(startTime) {
		return axios.post(url + '/start-time', { startTime })
			.catch(e => handleError(e));
	},

	get_language: function(language) {
		return axios.get(url + '/view/language')
			.catch(e => handleError(e));
	},

	set_language: function(language) {
		return axios.post(url + '/language', { language })
			.catch(e => handleError(e));
	},

	endCompetition: function() {
		return axios.get(url + '/finished').catch(e => handleError(e));
	},

	getAllInfo: function() {
		return axios.all([ getQuestions(), getSettings()])
			.then(axios.spread(function (ques, settgs) {
    		// Both requests are now complete
    		return [ ques.data, settgs.data ];
  		})).catch(e => handleError(e));
	}
}
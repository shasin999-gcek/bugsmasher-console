import React from 'react';
import { Alert } from 'react-bootstrap';

import CountDownTimer from './CountDownTimer';

class Result extends React.Component {
  
  render () {
    return (
      <div className="result-section">
         <CountDownTimer
            startTime={this.props.startTime}
            duration={this.props.duration} 
            {...this.props}
         /> 

         {this.props.result &&
            <div>
              <hr />
              <h3 className="page-header">Level {this.props.result.level } status</h3>
              <Alert bsStyle={this.props.result.isAccepted ? "success" : "danger"} className="submit-status">
                <strong>
                  {this.props.result.isAccepted
                    ? "Submission Accepted"
                    : "Submission Rejected" 
                  }
                </strong>
              </Alert>
            </div>
         }
      </div>
    );
  }
}

export default Result;

import React from 'react';
import { Alert, Well } from 'react-bootstrap';

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
              <h3><u>Level {this.props.result.level } status</u></h3>
              <Alert bsStyle={this.props.result.isAccepted ? "success" : "danger"} className="submit-status">
                <div className="container-fluid">
                  <div className="alert-icon">
                    <i className="material-icons">
                      {this.props.result.isAccepted ? "done" : "error_outline"}
                    </i>
                  </div>
                  <strong>
                    {this.props.result.isAccepted
                      ? "Submission Accepted"
                      : "Submission Rejected" 
                    }
                  </strong>
                </div>
              </Alert>
            </div>
         }
      </div>
    );
  }
}

export default Result;

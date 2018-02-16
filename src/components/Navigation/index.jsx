import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { delete_cookie } from 'sfcookies';

import app from 'helpers/app';

class Navigation extends Component{

  handleOnClick() {
    app.endCompetition()
    .then(res => {
      if(res.status === 200) {
        delete_cookie('token');
        this.props.history.push('/app/finished');
      }
    });
  }

  render() {
    return (
      <Navbar staticTop fluid>
        <Navbar.Header>
          <a className="navbar-brand">
            <span className="text-primary">
              <i className="material-icons md-18">bug_report</i>
              Bug Smasher
             </span>
          </a>
        </Navbar.Header>
        
        { this.props.isAuthenticated 
          ? (<div>
              <Navbar.Text>
                Signed in as: <strong>{ this.props.team.team_name }</strong>
              </Navbar.Text>
              <button 
                type="button"
                className="btn btn-success navbar-btn pull-right"
                onClick={() => this.handleOnClick()}
              >
              <span className="glyphicon glyphicon-flag"></span>&nbsp;Finish
              </button>
            </div>
          ) : (
            <div>
              <Link
                className="btn btn-link navbar-btn pull-right"
                to="/login"
              >
              <span className="glyphicon glyphicon-log-in"></span>&nbsp;Login
              </Link>
              <Link 
                className="btn btn-link navbar-btn pull-right"
                to="/register"
              >
              <span className="glyphicon glyphicon-edit"></span>&nbsp;Register
              </Link>
            </div>
          )  
        }
      </Navbar>
    );
  }
}

export default withRouter(Navigation);

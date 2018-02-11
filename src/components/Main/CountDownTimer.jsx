import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';

import Loading from 'components/Loading/Loading';

import app from 'helpers/app';

class CountDownTimer extends Component  {
	constructor(props) {
		super(props);
		this.state = {
      duration: props.duration,
      startTime: props.startTime,
			minutes: '',
			seconds: '',
      loading: false
		}
	}

  componentDidMount() {
    // setting up timer
    this.interval = window.setInterval(() => {
        
      // Set the date we're counting down to
      var countDownDate = this.state.startTime + 1000*60*(this.state.duration);
      
      // Update the count down every 1 second
      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = countDownDate - now;
      
      // Time calculations for days, hours, minutes and seconds
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // set the state
      this.setState({ minutes, seconds });

      // If the count down is over, give notification 
      if (distance <= 0) {
        window.clearInterval(this.interval);
        this.setState({ loading: true });
        app.endCompetition()
          .then(res => {
            if(res.status === 200) {
              this.setState({ loading: false });
              this.props.history.push('/app/finished');
            }
          });
      }

    }, 1000)

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      startTime: nextProps.startTime,
      duration: nextProps.duration
    });
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    let { minutes, seconds, loading } = this.state;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    if(loading) {
      return <Loading loading={true} />
    }

  	return (
  		<Nav bsStyle="pills" justified activeKey={2} onSelect={this.handleSelect}>
       <NavItem eventKey={2} title="Item" style={{ fontSize: '20px'}}>
         <span className="glyphicon glyphicon-time"></span> &nbsp;
          { [minutes, seconds].join(":") + ' sec' }
       </NavItem>
    	</Nav>
  	)
  }
}

export default CountDownTimer;
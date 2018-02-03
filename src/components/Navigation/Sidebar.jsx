import React from 'react'

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLevel: 1
    }
  }

  handleOnClick(selectedLevel) {
    this.setState({ selectedLevel });
    this.props.selectLevel(selectedLevel);
  }
  render () {
    return (
      <div id="sidebar-wrapper" className="sidebar-toggle">
        <ul className="sidebar-nav">
          {this.props.problems.map((problem, index) => (
            <li key={index}>
              <a 
                className={problem.info.level === this.state.selectedLevel ? "active" : null}
                href="#" 
                onClick={(e) => this.handleOnClick(problem.info.level)}>
                <i className="material-icons">description</i>
                { 'Level ' + problem.info.level }
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Sidebar;

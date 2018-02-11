import React from 'react'

class Sidebar extends React.Component {
  
  handleOnClick(selectedLevel) {
    this.props.selectLevel(selectedLevel);
  }
  render () {
    return (
      <div id="sidebar-wrapper">
        <ul>
          {this.props.problems.map((problem, index) => (
            <li 
              key={index} 
              className={problem.info.level === this.props.selectedLevel ? "active" : null}
              onClick={(e) => this.handleOnClick(problem.info.level)}>
                { 'Level ' + problem.info.level }
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Sidebar;

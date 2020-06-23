import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div id="quick-start-mode" className="container-fluid">
          <div className="hero-content">
            <h2>Quick Start</h2>
            <Link className="btn btn-outline-light" to='/workout/:workoutId'>Start</Link>
          </div>
        </div>
        <div id="custom-workout-mode" className="container-fluid">
          <div className="hero-content">
            <h2>Custom Workout</h2>
            <Link className="btn btn-outline-light" to='/custom-workout'>Build</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

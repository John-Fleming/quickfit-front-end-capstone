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
          </div>
          <div className="mode-btn">
            <Link className="btn btn-outline-light btn-lg" to='/workout/:workoutId'>Start</Link>
          </div>
        </div>
        <div id="custom-workout-mode" className="container-fluid">
          <div className="hero-content">
            <h2>Custom Workout</h2>
          </div>
          <div className="mode-btn">
            <Link className="btn btn-outline-light btn-lg" to='/custom-workout'>Build</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import './WorkoutBuilder.scss';

class WorkoutBuilder extends React.Component {
  render() {
    return (
      <div className="WorkoutBuilder">
        <h2>WorkoutBuilder</h2>
        <Link className="btn btn-outline-dark"to='/home'>Cancel to Home</Link>
        <Link className="btn btn-outline-dark" to='/workout/:workoutId'>To Live Workout</Link>
      </div>
    );
  }
}

export default WorkoutBuilder;

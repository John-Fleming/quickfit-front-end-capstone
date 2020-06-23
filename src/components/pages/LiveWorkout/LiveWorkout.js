import React from 'react';
import { Link } from 'react-router-dom';

class LiveWorkout extends React.Component {
  render() {
    return (
      <div className="LiveWorkout">
        <h2>LiveWorkout</h2>
        <Link className="btn btn-outline-dark" to='/home'>Cancel to Home</Link>
        <Link className="btn btn-outline-dark" to='/feedback/:workoutId'>To Post Workout</Link>
      </div>
    );
  }
}

export default LiveWorkout;

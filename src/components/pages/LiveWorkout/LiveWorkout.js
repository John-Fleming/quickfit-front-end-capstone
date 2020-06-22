import React from 'react';

class LiveWorkout extends React.Component {
  render() {
    return (
      <div className="LiveWorkout">
        <h2>LiveWorkout</h2>
        <button className="btn btn-outline-dark">Cancel to Home</button>
        <button className="btn btn-outline-dark">To Post Workout</button>
      </div>
    );
  }
}

export default LiveWorkout;

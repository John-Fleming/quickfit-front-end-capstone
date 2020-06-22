import React from 'react';

class WorkoutBuilder extends React.Component {
  render() {
    return (
      <div className="WorkoutBuilder">
        <h2>WorkoutBuilder</h2>
        <button className="btn btn-outline-dark">Cancel to Home</button>
        <button className="btn btn-outline-dark">To Live Workout</button>
      </div>
    );
  }
}

export default WorkoutBuilder;

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

import authData from '../../../helpers/data/authData';
import workoutData from '../../../helpers/data/workoutData';

class Home extends React.Component {
createQuickStartWorkout = () => {
  const newWorkout = {
    upperExercise: 'exercise1',
    lowerExercise: 'exercise2',
    coreExercise: 'exercise3',
    plyoExercise: 'exercise4',
    reps: 15,
    sets: 6,
    isFavorited: true,
    UID: authData.getUid(),
  };
  workoutData.createWorkout(newWorkout)
    .then((resp) => {
      const workoutId = resp.data.name;
      this.props.history.push(`/workout/${workoutId}`);
    })
    .catch((err) => console.error('could not create quick start workout: ', err));
}

render() {
  return (
    <div className="Home">
      <div id="quick-start-mode" className="container-fluid">
        <div className="hero-content">
          <h2>Quick Start</h2>
        </div>
        <div className="mode-btn">
          <button className="btn btn-outline-light btn-lg" onClick={this.createQuickStartWorkout}>Start</button>
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

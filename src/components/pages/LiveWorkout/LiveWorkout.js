import React from 'react';
// import { Link } from 'react-router-dom';
import './LiveWorkout.scss';

import workoutData from '../../../helpers/data/workoutData';
import authData from '../../../helpers/data/authData';
import completedWorkoutData from '../../../helpers/data/completedWorkoutData';

const moment = require('moment');

class LiveWorkout extends React.Component {
  state = {
    workout: {},
  }

  componentDidMount() {
    const { workoutId } = this.props.match.params;
    workoutData.getSingleWorkout(workoutId)
      .then((resp) => this.setState({ workout: resp.data }))
      .catch((err) => console.error('could not get specific workout: , err'));
  }

  cancelWorkout = () => {
    const { workoutId } = this.props.match.params;
    workoutData.deleteSingleWorkout(workoutId)
      .then(() => this.props.history.push('/home'))
      .catch((err) => console.error('could not delete workout: ', err));
  }

  postCompletedWorkout = () => {
    const { workoutId } = this.props.match.params;
    const newCompletedWorkout = {
      workoutId,
      timestamp: moment().format('MM-DD-YYYY'),
      UID: authData.getUid(),
    };
    completedWorkoutData.createCompletedWorkout(newCompletedWorkout)
      .then(() => this.props.history.push(`/feedback/${workoutId}`))
      .catch((err) => console.error('could not create new completed workout: ', err));
  }

  render() {
    const { workout } = this.state;
    return (
      <div className="LiveWorkout">
        <h2>Your Workout</h2>
        <div className="row">
          <p className="repsets"><strong>Reps:</strong> {workout.reps}</p>
          <p className="repsets"><strong>Sets:</strong> {workout.sets}</p>
        </div>
        <button className="btn btn-outline-dark" onClick={this.cancelWorkout}>Cancel</button>
        <button className="btn btn-outline-dark" onClick={this.postCompletedWorkout}>Finish</button>
      </div>
    );
  }
}

export default LiveWorkout;

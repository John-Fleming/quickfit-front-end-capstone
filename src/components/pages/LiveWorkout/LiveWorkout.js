import React from 'react';
// import { Link } from 'react-router-dom';
import './LiveWorkout.scss';

import workoutData from '../../../helpers/data/workoutData';
import authData from '../../../helpers/data/authData';
import completedWorkoutData from '../../../helpers/data/completedWorkoutData';
import exerciseData from '../../../helpers/data/exerciseData';

const moment = require('moment');

class LiveWorkout extends React.Component {
  state = {
    workout: {},
    upperExercise: {},
    lowerExercise: {},
    coreExercise: {},
    plyoExercise: {},
  }

  getSingleUpperExercise = (exerciseId) => {
    exerciseData.getSingleExercise(exerciseId)
      .then((resp) => this.setState({ upperExercise: resp.data }))
      .catch((err) => console.error('Could not get specific upper exercise: ', err));
  }

  getSingleLowerExercise = (exerciseId) => {
    exerciseData.getSingleExercise(exerciseId)
      .then((resp) => this.setState({ lowerExercise: resp.data }))
      .catch((err) => console.error('Could not get specific upper exercise: ', err));
  }

  getSingleCoreExercise = (exerciseId) => {
    exerciseData.getSingleExercise(exerciseId)
      .then((resp) => this.setState({ coreExercise: resp.data }))
      .catch((err) => console.error('Could not get specific upper exercise: ', err));
  }

  getSinglePlyoExercise = (exerciseId) => {
    exerciseData.getSingleExercise(exerciseId)
      .then((resp) => this.setState({ plyoExercise: resp.data }))
      .catch((err) => console.error('Could not get specific upper exercise: ', err));
  }

  componentDidMount() {
    const { workoutId } = this.props.match.params;
    workoutData.getSingleWorkout(workoutId)
      .then((resp) => {
        const workout = resp.data;
        this.setState({ workout });
        this.getSingleUpperExercise(workout.upperExercise);
        this.getSingleLowerExercise(workout.lowerExercise);
        this.getSingleCoreExercise(workout.coreExercise);
        this.getSinglePlyoExercise(workout.plyoExercise);
      })
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
        <div className="row excercise-counts">
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

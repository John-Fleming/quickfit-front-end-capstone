import React from 'react';
import './LiveWorkout.scss';

import authData from '../../../helpers/data/authData';
import completedWorkoutData from '../../../helpers/data/completedWorkoutData';
import exerciseData from '../../../helpers/data/exerciseData';
import workoutData from '../../../helpers/data/workoutData';
import SingleExercise from '../../shared/SingleExercise/SingleExercise';

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
      .catch((err) => console.error('Could not get specific lower exercise: ', err));
  }

  getSingleCoreExercise = (exerciseId) => {
    exerciseData.getSingleExercise(exerciseId)
      .then((resp) => this.setState({ coreExercise: resp.data }))
      .catch((err) => console.error('Could not get specific core exercise: ', err));
  }

  getSinglePlyoExercise = (exerciseId) => {
    exerciseData.getSingleExercise(exerciseId)
      .then((resp) => this.setState({ plyoExercise: resp.data }))
      .catch((err) => console.error('Could not get specific plyo exercise: ', err));
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
    const {
      workout,
      upperExercise,
      lowerExercise,
      coreExercise,
      plyoExercise,
    } = this.state;
    const exerciseArr = [upperExercise, lowerExercise, coreExercise, plyoExercise];

    const buildExerciseAccordion = exerciseArr.map((exercise, i) => <SingleExercise key={`workoutExercise${i}`} exercise={exercise} />);

    return (
      <div className="LiveWorkout">
        <div className="workout-header">
          <h2>Your Workout</h2>
          <p>Perform <strong>{workout.reps} Reps</strong> of each exercise</p>
          <p>Repeat for <strong>{workout.sets} Sets</strong></p>
        </div>
        <div id="exercises-accordion">
          {buildExerciseAccordion}
        </div>
        <div className="workout-btns mt-5">
          <button className="btn btn-outline-dark btn-lg" onClick={this.cancelWorkout}>Cancel</button>
          <button className="btn btn-outline-dark btn-lg" onClick={this.postCompletedWorkout}>Finish</button>
        </div>
      </div>
    );
  }
}

export default LiveWorkout;

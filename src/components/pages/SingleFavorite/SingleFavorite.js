import React from 'react';
import { Link } from 'react-router-dom';
import './SingleFavorite.scss';

import exerciseData from '../../../helpers/data/exerciseData';
import workoutData from '../../../helpers/data/workoutData';
import SingleExercise from '../../shared/SingleExercise/SingleExercise';

class SingleFavorite extends React.Component {
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

  patchIsFavorited = () => {
    const isFavorited = false;
    const { workoutId } = this.props.match.params;
    workoutData.updateFavoritedStatus(workoutId, isFavorited)
      .then(() => this.props.history.push('/profile'))
      .catch((err) => console.error('could not update favorites status: ', err));
  }

  render() {
    const {
      workout,
      upperExercise,
      lowerExercise,
      coreExercise,
      plyoExercise,
    } = this.state;
    const { workoutId } = this.props.match.params;
    const workoutLink = `/workout/${workoutId}`;
    const exerciseArr = [upperExercise, lowerExercise, coreExercise, plyoExercise];
    const buildExerciseAccordion = exerciseArr.map((exercise, i) => <SingleExercise key={`workoutExercise${i}`} exercise={exercise} />);

    return (
      <div className="SingleFavorite">
        <div className="favorites-header row col-10 offset-1">
          <Link className="btn mr-2 back-btn" to='/profile'><i className="fas fa-chevron-left"></i></Link>
          <h2>Favorited Workouts</h2>
        </div>
        <div className="row excercise-counts mb-5">
          <p className="repsets"><strong>Reps:</strong> {workout.reps}</p>
          <p className="repsets"><strong>Sets:</strong> {workout.sets}</p>
        </div>
        <div id="exercisesAccordion">
          {buildExerciseAccordion}
        </div>
        <Link className="btn btn-outline-dark" to='/profile' onClick={this.patchIsFavorited}>Unfavorite</Link>
        <button className="btn btn-outline-dark" >Save</button>
        <Link className="btn btn-outline-dark" to={workoutLink}>To Live Workout</Link>
      </div>
    );
  }
}

export default SingleFavorite;

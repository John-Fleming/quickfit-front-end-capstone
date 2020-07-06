import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import './SingleFavorite.scss';

import exerciseData from '../../../helpers/data/exerciseData';
import workoutData from '../../../helpers/data/workoutData';
import SingleExercise from '../../shared/SingleExercise/SingleExercise';

class SingleFavorite extends React.Component {
  state = {
    workout: {},
    workoutReps: '',
    workoutSets: '',
    upperExercise: {},
    lowerExercise: {},
    coreExercise: {},
    plyoExercise: {},
    isOpen: false,
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  repsChange = (e) => {
    e.preventDefault();
    const newReps = e.target.value * 1;
    this.setState({ workoutReps: newReps });
  }

  setsChange = (e) => {
    e.preventDefault();
    const newSets = e.target.value * 1;
    this.setState({ workoutSets: newSets });
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
        this.setState({ workout, workoutReps: workout.reps, workoutSets: workout.sets });
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

  patchRepSets = () => {
    const { workoutId } = this.props.match.params;
    const { workoutReps, workoutSets } = this.state;
    workoutData.updateRepsAndSets(workoutId, workoutReps, workoutSets)
      .then(() => this.toggle)
      .catch((err) => console.error('could not update reps or sets: ', err));
  }

  render() {
    const {
      workout,
      upperExercise,
      lowerExercise,
      coreExercise,
      plyoExercise,
      isOpen,
    } = this.state;
    const { workoutId } = this.props.match.params;
    const workoutLink = `/workout/${workoutId}`;
    const exerciseArr = [upperExercise, lowerExercise, coreExercise, plyoExercise];
    const buildExerciseAccordion = exerciseArr.map((exercise, i) => <SingleExercise key={`workoutExercise${i}`} exercise={exercise} />);

    return (
      <div className="SingleFavorite">
        <div className="single-favorite-header">
          <h2>Favorited Workout</h2>
          <div className="excercise-counts row col-6 offset-3">
            <div className="form-group ml-auto mr-2">
              <label htmlFor="favorites-reps-dropdown">Update default reps:</label>
              <select className="form-control" id="favorites-reps-dropdown" onChange={this.repsChange}>
                <option hidden>{workout.reps}</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
              </select>
            </div>
            <div className="form-group mr-auto ml-2">
              <label htmlFor="favorites-sets-dropdown">Update default sets:</label>
              <select className="form-control" id="favorites-sets-dropdown" onChange={this.setsChange}>
                <option hidden>{workout.sets}</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>
        </div>
        <Link className="btn mr-2 single-fav-back-btn" to='/profile'><i className="fas fa-chevron-left"></i></Link>
        <div id="exercisesAccordion">
          {buildExerciseAccordion}
        </div>
        <div className="favorites-btns">
          <Link className="btn btn-outline-light btn-lg" to='/profile' onClick={this.patchIsFavorited}>Unfavorite</Link>
          <button className="btn btn-outline-light btn-lg" onClick={this.patchRepSets}>Save</button>
          <Link className="btn btn-outline-light btn-lg" to={workoutLink}>Launch Workout</Link>
        </div>
        <Alert color="success" isOpen={isOpen}>
          Workout updated successfully!
        </Alert>
      </div>
    );
  }
}

export default SingleFavorite;

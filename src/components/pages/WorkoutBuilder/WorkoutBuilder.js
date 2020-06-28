import React from 'react';
import { Link } from 'react-router-dom';
import './WorkoutBuilder.scss';

import exerciseTypeData from '../../../helpers/data/exerciseTypeData';

import ExerciseTypeBuilder from '../../shared/ExerciseTypeBuilder/ExerciseTypeBuilder';
import exerciseData from '../../../helpers/data/exerciseData';

class WorkoutBuilder extends React.Component {
  state = {
    selectedUpperExercise: '',
    selectedLowerExercise: '',
    selectedCoreExercise: '',
    selectedPlyoExercise: '',
    reps: '',
    sets: '',
    exerciseTypes: [],
    exercises: [],
  }

  repsChange = (e) => {
    e.preventDefault();
    const reps = e.target.value * 1;
    this.setState({ reps });
  }

  setsChange = (e) => {
    e.preventDefault();
    const sets = e.target.value * 1;
    this.setState({ sets });
  }

  setSelectedExercises = (exerciseId) => {
    const { exercises } = this.state;
    const exerciseType = exercises.find((x) => x.id === exerciseId).typeId;
    if (exerciseType === 'exerciseType1') {
      this.setState({ selectedUpperExercise: exerciseId });
    } else if (exerciseType === 'exerciseType2') {
      this.setState({ selectedLowerExercise: exerciseId });
    } else if (exerciseType === 'exerciseType3') {
      this.setState({ selectedCoreExercise: exerciseId });
    } else {
      this.setState({ selectedPlyoExercise: exerciseId });
    }
  }

  setAllExercises = () => {
    exerciseData.getAllExercises()
      .then((resp) => this.setState({ exercises: resp }))
      .catch((err) => console.error('could not get exercises array: ', err));
  }

  setExerciseTypes = () => {
    exerciseTypeData.getExerciseTypes()
      .then((resp) => this.setState({ exerciseTypes: resp }))
      .catch((err) => console.error('could not get exercise types: ', err));
  }

  componentDidMount() {
    this.setExerciseTypes();
    this.setAllExercises();
  }

  render() {
    const { exerciseTypes } = this.state;
    const buildAccordions = exerciseTypes.map((type) => <ExerciseTypeBuilder key={type.id} type={type} setSelectedExercises={this.setSelectedExercises}/>);

    return (
      <div className="WorkoutBuilder">
        <h2>Build Your Workout</h2>
        <div className="row excercise-counts mb-4">
          <div className="form-group mr-3">
            <label htmlFor="favorites-reps-dropdown">Select reps:</label>
            <select className="form-control" id="favorites-reps-dropdown" onChange={this.repsChange}>
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
          <div className="form-group">
            <label htmlFor="favorites-sets-dropdown">Select sets:</label>
            <select className="form-control" id="favorites-sets-dropdown" onChange={this.setsChange}>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>
        <div id="exerciseBuilderAccordions">
          {buildAccordions}
        </div>
        <div className="custom-workout-btns mt-4">
          <Link className="btn btn-outline-dark"to='/home'>Cancel to Home</Link>
          <Link className="btn btn-outline-dark" to='/workout/:workoutId'>To Live Workout</Link>
        </div>
      </div>
    );
  }
}

export default WorkoutBuilder;

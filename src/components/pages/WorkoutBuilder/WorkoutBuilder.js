import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import './WorkoutBuilder.scss';

import authData from '../../../helpers/data/authData';
import exerciseData from '../../../helpers/data/exerciseData';
import exerciseTypeData from '../../../helpers/data/exerciseTypeData';

import ExerciseTypeBuilder from '../../shared/ExerciseTypeBuilder/ExerciseTypeBuilder';
import workoutData from '../../../helpers/data/workoutData';

class WorkoutBuilder extends React.Component {
  state = {
    selectedUpperExercise: null,
    selectedLowerExercise: null,
    selectedCoreExercise: null,
    selectedPlyoExercise: null,
    reps: 5,
    sets: 4,
    exerciseTypes: [],
    exercises: [],
    isOpen: false,
  }

  toggle = () => {
    this.setState({ isOpen: true },
      () => {
        window.setTimeout(() => { this.setState({ isOpen: false }); }, 4000);
      });
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
    window.scrollTo(0, 0);
  }

  submitCustomWorkout = () => {
    const {
      selectedUpperExercise,
      selectedLowerExercise,
      selectedCoreExercise,
      selectedPlyoExercise,
      reps,
      sets,
    } = this.state;

    const newCustomWorkout = {
      upperExercise: selectedUpperExercise,
      lowerExercise: selectedLowerExercise,
      coreExercise: selectedCoreExercise,
      plyoExercise: selectedPlyoExercise,
      reps,
      sets,
      isFavorited: false,
      UID: authData.getUid(),
    };

    if (newCustomWorkout.upperExercise && newCustomWorkout.lowerExercise && newCustomWorkout.coreExercise && newCustomWorkout.plyoExercise) {
      workoutData.createWorkout(newCustomWorkout)
        .then((resp) => {
          const workoutId = resp.data.name;
          this.props.history.push(`/workout/${workoutId}`);
        })
        .catch((err) => console.error('could not create custom workout: ', err));
    } else {
      this.toggle();
    }
  }

  render() {
    const { exerciseTypes, isOpen } = this.state;
    const buildAccordions = exerciseTypes.map((type) => <ExerciseTypeBuilder key={type.id} type={type} setSelectedExercises={this.setSelectedExercises}/>);

    return (
      <div className="WorkoutBuilder">
        <div className="workout-builder-header">
          <h2>Build Your Workout</h2>
          <div className="excercise-counts row col-6 offset-3">
            <div className="form-group mx-auto">
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
            <div className="form-group mx-auto">
              <label htmlFor="favorites-sets-dropdown">Select sets:</label>
              <select className="form-control" id="favorites-sets-dropdown" onChange={this.setsChange}>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>
        </div>
        <div id="exerciseBuilderAccordions">
          {buildAccordions}
        </div>

        <Alert className="select-exercise-alert" isOpen={isOpen}>
        Please select an exercise for each category!
        </Alert>

        <div className="custom-workout-btns">
          <Link className="btn btn-outline-light btn-lg"to='/home'>Cancel</Link>
          <button className="btn btn-outline-light btn-lg" onClick={this.submitCustomWorkout} to='/workout/:workoutId'>Start</button>
        </div>
      </div>
    );
  }
}

export default WorkoutBuilder;

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

import authData from '../../../helpers/data/authData';
import workoutData from '../../../helpers/data/workoutData';
import exerciseData from '../../../helpers/data/exerciseData';

class Home extends React.Component {
  state = {
    upperExercises: [],
    lowerExercises: [],
    coreExercises: [],
    plyoExercises: [],
  };

  getUpperExercises = () => {
    const exerciseId = 'exerciseType1';
    exerciseData.getExerciseByTypeId(exerciseId)
      .then((resp) => this.setState({ upperExercises: resp }))
      .catch((err) => console.error('could not get upper body exercises: ', err));
  }

  getLowerExercises = () => {
    const exerciseId = 'exerciseType2';
    exerciseData.getExerciseByTypeId(exerciseId)
      .then((resp) => this.setState({ lowerExercises: resp }))
      .catch((err) => console.error('could not get lower body exercises: ', err));
  }

  getCoreExercises = () => {
    const exerciseId = 'exerciseType3';
    exerciseData.getExerciseByTypeId(exerciseId)
      .then((resp) => this.setState({ coreExercises: resp }))
      .catch((err) => console.error('could not get core exercises: ', err));
  }

  getPlyoExercises = () => {
    const exerciseId = 'exerciseType4';
    exerciseData.getExerciseByTypeId(exerciseId)
      .then((resp) => this.setState({ plyoExercises: resp }))
      .catch((err) => console.error('could not get plyo exercises: ', err));
  }

  componentDidMount() {
    this.getUpperExercises();
    this.getLowerExercises();
    this.getCoreExercises();
    this.getPlyoExercises();
  }

  randomExercise = (arr) => arr[Math.floor(Math.random() * arr.length)];

  createQuickStartWorkout = () => {
    const {
      upperExercises,
      lowerExercises,
      coreExercises,
      plyoExercises,
    } = this.state;

    const newWorkout = {
      upperExercise: this.randomExercise(upperExercises).id,
      lowerExercise: this.randomExercise(lowerExercises).id,
      coreExercise: this.randomExercise(coreExercises).id,
      plyoExercise: this.randomExercise(plyoExercises).id,
      reps: 10,
      sets: 5,
      isFavorited: false,
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

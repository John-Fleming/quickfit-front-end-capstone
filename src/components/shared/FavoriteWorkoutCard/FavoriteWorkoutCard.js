import React from 'react';
import { Link } from 'react-router-dom';
import './FavoriteWorkoutCard.scss';

import exerciseData from '../../../helpers/data/exerciseData';

import workoutShape from '../../../helpers/propz/workoutShape';

class FavoriteWorkoutCard extends React.Component {
  static propTypes = {
    workout: workoutShape.workoutShape,
  }

  state = {
    upperExercise: '',
    lowerExercise: '',
    coreExercise: '',
    plyoExercise: '',
  }

  getUpperName = () => {
    const { workout } = this.props;
    const exerciseId = workout.upperExercise;
    exerciseData.getSingleExercise(exerciseId)
      .then((resp) => {
        const exercise = resp.data.exerciseName;
        this.setState({ upperExercise: exercise });
      })
      .catch((err) => console.error('could not get specific exercise: ', err));
  };

  getLowerName = () => {
    const { workout } = this.props;
    const exerciseId = workout.lowerExercise;
    exerciseData.getSingleExercise(exerciseId)
      .then((resp) => {
        const exercise = resp.data.exerciseName;
        this.setState({ lowerExercise: exercise });
      })
      .catch((err) => console.error('could not get specific exercise: ', err));
  };

  getCoreName = () => {
    const { workout } = this.props;
    const exerciseId = workout.coreExercise;
    exerciseData.getSingleExercise(exerciseId)
      .then((resp) => {
        const exercise = resp.data.exerciseName;
        this.setState({ coreExercise: exercise });
      })
      .catch((err) => console.error('could not get specific exercise: ', err));
  };

  getPlyoName = () => {
    const { workout } = this.props;
    const exerciseId = workout.plyoExercise;
    exerciseData.getSingleExercise(exerciseId)
      .then((resp) => {
        const exercise = resp.data.exerciseName;
        this.setState({ plyoExercise: exercise });
      })
      .catch((err) => console.error('could not get specific exercise: ', err));
  };

  componentDidMount() {
    this.getUpperName();
    this.getLowerName();
    this.getCoreName();
    this.getPlyoName();
  }

  render() {
    const {
      upperExercise,
      lowerExercise,
      coreExercise,
      plyoExercise,
    } = this.state;
    const { workout } = this.props;

    return (
      <div className="FavoriteWorkoutCard">
        <div className="card fav-workout-content">
          <h6 className="mr-auto">{upperExercise} - {lowerExercise} - {coreExercise} - {plyoExercise}</h6>
          <Link className="btn ml-auto" to={`/favorites/${workout.id}`}><i className="fas fa-search"></i></Link>
        </div>
      </div>
    );
  }
}

export default FavoriteWorkoutCard;

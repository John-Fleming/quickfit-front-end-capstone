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
      <Link className="FavoriteWorkoutCard btn btn-outline-dark py-2 text-center" to={`/favorites/${workout.id}`}>
        {upperExercise} - {lowerExercise} - {coreExercise} - {plyoExercise}
        <i className="fas fa-search ml-2"></i>
      </Link>
    );
  }
}

export default FavoriteWorkoutCard;

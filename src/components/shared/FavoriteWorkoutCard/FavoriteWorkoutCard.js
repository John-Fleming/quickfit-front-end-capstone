import React from 'react';
import { Link } from 'react-router-dom';
import workoutShape from '../../../helpers/propz/workoutShape';

class FavoriteWorkoutCard extends React.Component {
  static propTypes = {
    workout: workoutShape.workoutShape,
  }

  render() {
    const { workout } = this.props;
    return (
      <div className="FavoriteWorkoutCard">
        <div className="card">
          <h6>{workout.upperExercise} - {workout.lowerExercise} - {workout.coreExercise} - {workout.plyoExercise}</h6>
          <Link className="btn ml-auto" to={`/favorites/${workout.id}`}><i className="fas fa-search"></i></Link>
        </div>
      </div>
    );
  }
}

export default FavoriteWorkoutCard;

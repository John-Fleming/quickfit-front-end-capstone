import React from 'react';
import { Link } from 'react-router-dom';
import './Favorites.scss';

import authData from '../../../helpers/data/authData';
import workoutData from '../../../helpers/data/workoutData';
import FavoriteWorkoutCard from '../../shared/FavoriteWorkoutCard/FavoriteWorkoutCard';

class Favorites extends React.Component {
  state = {
    favoriteWorkouts: [],
  }

  getFavoriteWorkouts() {
    const uid = authData.getUid();
    workoutData.getFavoriteWorkoutsByUid(uid)
      .then((resp) => this.setState({ favoriteWorkouts: resp }))
      .catch((err) => console.error('could not get favorite workouts: ', err));
  }

  componentDidMount() {
    this.getFavoriteWorkouts();
  }

  render() {
    const { favoriteWorkouts } = this.state;
    const buildFavWorkoutCards = favoriteWorkouts.map((workout) => <FavoriteWorkoutCard key={workout.id} workout={workout} />);
    return (
      <div className="Favorites">
        <div className="favorites-header row col-10 offset-1">
          <h2 className="mr-auto">Favorite Workouts</h2>
          <Link className="btn btn-outline-dark ml-auto" to='/profile'>Back to profile</Link>
        </div>
        <div className="favorite-workouts-container col-10 offset-1">
          {buildFavWorkoutCards}
        </div>
      </div>
    );
  }
}

export default Favorites;

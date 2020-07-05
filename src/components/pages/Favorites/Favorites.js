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
    const buildFavWorkoutCards = favoriteWorkouts.map((workout) => <FavoriteWorkoutCard key={workout.id} workout={workout}/>);
    return (
      <div className="Favorites">
        <Link className="btn mr-2 favorites-back-btn" to='/profile'><i className="fas fa-chevron-left"></i></Link>
        <div className="favorites-header col-10 offset-1">
          <h2>Favorite Workouts</h2>
        </div>
        <div className="favorite-workouts-container col-10 offset-1">
          {buildFavWorkoutCards}
        </div>
      </div>
    );
  }
}

export default Favorites;

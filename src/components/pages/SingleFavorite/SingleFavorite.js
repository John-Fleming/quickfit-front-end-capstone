import React from 'react';
import { Link } from 'react-router-dom';
import './SingleFavorite.scss';

class SingleFavorite extends React.Component {
  render() {
    return (
      <div className="SingleFavorite">
        <div className="favorites-header row col-10 offset-1">
          <Link className="btn mr-2 back-btn" to='/profile'><i className="fas fa-chevron-left"></i></Link>
          <h2>Favorited Workouts</h2>
        </div>
        <Link className="btn btn-outline-dark" to='/workout/:workoutId'>To Live Workout</Link>
      </div>
    );
  }
}

export default SingleFavorite;

import React from 'react';
import { Link } from 'react-router-dom';
import './Favorites.scss';

class Favorites extends React.Component {
  render() {
    return (
      <div className="Favorites">
        <h2>Favorites</h2>
        <Link className="btn btn-outline-dark" to='/profile'>Back to profile</Link>
        <Link className="btn btn-outline-dark" to='/favorites/:workoutId'>To Single Favorite</Link>
      </div>
    );
  }
}

export default Favorites;

import React from 'react';
import { Link } from 'react-router-dom';

class SingleFavorite extends React.Component {
  render() {
    return (
      <div className="SingleFavorite">
        <h2>SingleFavorite</h2>
        <Link className="btn btn-outline-dark" to='/profile'>Back to Profile</Link>
        <Link className="btn btn-outline-dark" to='/workout/:workoutId'>To Live Workout</Link>
      </div>
    );
  }
}

export default SingleFavorite;

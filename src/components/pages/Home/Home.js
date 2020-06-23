import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <h2>Home</h2>
        <Link className="btn btn-outline-dark" to='/workout/:workoutId'>To Live Workout</Link>
        <Link className="btn btn-outline-dark" to='/custom-workout'>To Custom Workout Page</Link>
      </div>
    );
  }
}

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';

class PostWorkout extends React.Component {
  render() {
    return (
      <div className="PostWorkout">
        <h2>PostWorkout</h2>
        <Link className="btn btn-outline-dark" to='/home'>Skip to Home</Link>
        <Link className="btn btn-outline-dark" to='/profile'>To Profile</Link>
      </div>
    );
  }
}

export default PostWorkout;

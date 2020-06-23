import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.scss';

class Profile extends React.Component {
  render() {
    return (
      <div className="Profile">
        <h2>Profile</h2>
        <Link className="btn btn-outline-dark" to='/home'>Go to to Home</Link>
        <Link className="btn btn-outline-dark" to='/favorites'>To Favorites</Link>
      </div>
    );
  }
}

export default Profile;

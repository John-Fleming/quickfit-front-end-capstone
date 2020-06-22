import React from 'react';

class Profile extends React.Component {
  render() {
    return (
      <div className="Profile">
        <h2>Profile</h2>
        <button className="btn btn-outline-dark">Go to to Home</button>
        <button className="btn btn-outline-dark">To Favorites</button>
      </div>
    );
  }
}

export default Profile;

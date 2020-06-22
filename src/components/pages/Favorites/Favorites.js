import React from 'react';

class Favorites extends React.Component {
  render() {
    return (
      <div className="Favorites">
        <h2>Favorites</h2>
        <button className="btn btn-outline-dark">Back to profile</button>
        <button className="btn btn-outline-dark">To Single Favorite</button>
      </div>
    );
  }
}

export default Favorites;

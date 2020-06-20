import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

class Home extends React.Component {
  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="Home">
        <h2>Home</h2>
        <button className="btn btn-outline-dark mt-3" onClick={this.logMeOut}>Logout</button>
      </div>
    );
  }
}

export default Home;

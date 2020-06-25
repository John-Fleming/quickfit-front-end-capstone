import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './Login.scss';

class Login extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className="Login mx-auto">
        <div className="logo d-flex justify-content-center">
          <span><i className="fas fa-running fa-5x"></i></span>
        </div>
        <h1 className="app-title">Workout App</h1>
        <div id="login-btn" className="d-flex justify-content-center">
          <button className="btn btn-outline-dark btn-lg mt-3" onClick={this.loginClickEvent}>Login</button>
        </div>
      </div>
    );
  }
}

export default Login;

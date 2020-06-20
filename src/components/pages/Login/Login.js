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
      <div className="Login">
        <button className="btn btn-outline-dark mt-3" onClick={this.loginClickEvent}>Login</button>
      </div>
    );
  }
}

export default Login;

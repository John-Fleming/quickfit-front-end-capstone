import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import './Profile.scss';

import authData from '../../../helpers/data/authData';
import completedWorkoutData from '../../../helpers/data/completedWorkoutData';
import workoutData from '../../../helpers/data/workoutData';

class Profile extends React.Component {
  state = {
    username: '',
    userAvatar: '',
    completedWorkouts: [],
    favoriteWorkouts: [],
  }

  getAuthedUser() {
    const username = authData.getCurrentUser().displayName;
    const userAvatar = authData.getCurrentUser().photoURL;
    this.setState({ username, userAvatar });
  }

  getCompletedWorkouts() {
    const uid = authData.getUid();
    completedWorkoutData.getCompletedWorkoutsByUid(uid)
      .then((resp) => this.setState({ completedWorkouts: resp }))
      .catch((err) => console.error('could not get completed workouts: ', err));
  }

  getFavoriteWorkouts() {
    const uid = authData.getUid();
    workoutData.getFavoriteWorkoutsByUid(uid)
      .then((resp) => this.setState({ favoriteWorkouts: resp }))
      .catch((err) => console.error('could not get favorite workouts: ', err));
  }

  componentDidMount() {
    this.getAuthedUser();
    this.getCompletedWorkouts();
    this.getFavoriteWorkouts();
  }

  deleteAllWorkouts = (workoutId) => {
    workoutData.deleteSingleWorkout(workoutId)
      .then()
      .catch((err) => console.error('could not delete workouts: ', err));
  };

  deleteCompletedWorkouts = (completedWorkoutId) => {
    completedWorkoutData.deleteCompletedWorkout(completedWorkoutId)
      .then()
      .catch((err) => console.error('could not delete completed workouts: ', err));
  };

  deleteWorkoutHistory = (e) => {
    e.preventDefault();
    const { completedWorkouts } = this.state;
    const uid = authData.getUid();
    completedWorkouts.forEach((workout) => {
      const { workoutId } = workout;
      const completedWorkoutId = workout.completeId;
      this.deleteAllWorkouts(workoutId);
      this.deleteCompletedWorkouts(completedWorkoutId);
    });
    // this function gets any other remaining workouts associated with the user and deletes them
    workoutData.getAllWorkoutsByUid(uid)
      .then((resp) => {
        const uncompletedUserWorkouts = resp;
        uncompletedUserWorkouts.forEach((workout) => this.deleteAllWorkouts(workout.id));
      })
      .catch((err) => console.error('could not get favorite workouts: ', err));
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const {
      username,
      userAvatar,
      completedWorkouts,
      favoriteWorkouts,
    } = this.state;
    return (
      <div className="Profile">
        <div className="card profile-card text-center col-lg-8 col-10 mx-auto shadow">
          <div className="photo-container">
            <img id="userAvatar" src={userAvatar} alt=""/>
          </div>
          <div className="user-profile-content">
            <h4 className="username">{username}</h4>
            <div className="row workout-counts">
              <div className="col-6 completed-workout-container">
                <h6 className="workout-counts-header">Completed</h6>
                <p className="workout-total">{completedWorkouts.length}</p>
              </div>
              <div className="col-6 favorited-workout-container">
                <h6 className="workout-counts-header">Favorited</h6>
                <p className="workout-total">{favoriteWorkouts.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-btns d-flex flex-column col-lg-8 col-10 mx-auto">
          <Link className="btn btn-outline-dark mt-4" to='/home'>Start New Workout</Link>
          <Link className="btn btn-outline-dark mt-3" to='/favorites'>View Favorites</Link>
          <button className="btn btn-outline-dark mt-3" onClick={this.deleteWorkoutHistory}>Delete Workout History</button>
          <button className="btn btn-outline-dark my-3" onClick={this.logMeOut}>Logout</button>
        </div>
      </div>
    );
  }
}

export default Profile;

import React from 'react';
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

  render() {
    const { username, userAvatar, completedWorkouts } = this.state;
    return (
      <div className="Profile">
        <div className="profile-card row col-10 offset-1">
          <div className="col-4 profile-card-left">
            <img src={userAvatar} alt=""/>
          </div>
          <div className="col-8 profile-card-right text-center">
            <h4>{username}</h4>
            <div className="row workout-counts">
              <div className="col-6 completed-workout-container">
                <h6 className="workout-counts-header">Completed</h6>
                <p className="completed-workout-count">{completedWorkouts.length}</p>
              </div>
              <div className="col-6 favorited-workout-container">
              <h6 className="workout-counts-header">Favorited</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-btns d-flex flex-column col-10 offset-1">
          <Link className="btn btn-outline-dark mt-4" to='/home'>Start New Workout</Link>
          <Link className="btn btn-outline-dark mt-3" to='/favorites'>View Favorites</Link>
        </div>
      </div>
    );
  }
}

export default Profile;

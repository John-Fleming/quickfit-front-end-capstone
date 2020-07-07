import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './App.scss';

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Favorites from '../components/pages/Favorites/Favorites';
import Home from '../components/pages/Home/Home';
import LiveWorkout from '../components/pages/LiveWorkout/LiveWorkout';
import Login from '../components/pages/Login/Login';
import PostWorkout from '../components/pages/PostWorkout/PostWorkout';
import Profile from '../components/pages/Profile/Profile';
import SingleFavorite from '../components/pages/SingleFavorite/SingleFavorite';
import WorkoutBuilder from '../components/pages/WorkoutBuilder/WorkoutBuilder';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';

import fbConnection from '../helpers/data/connection';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed}/>
            <div className="container-fluid">
              <div className="row">
                <Switch>
                  <PrivateRoute path='/home' component={Home} authed={authed}/>
                  <PrivateRoute path='/custom-workout' component={WorkoutBuilder} authed={authed}/>
                  <PrivateRoute path='/workout/:workoutId' component={LiveWorkout} authed={authed}/>
                  <PrivateRoute path='/feedback/:workoutId' component={PostWorkout} authed={authed}/>
                  <PrivateRoute path='/profile' component={Profile} authed={authed}/>
                  <PrivateRoute path='/favorites/:workoutId' component={SingleFavorite} authed={authed}/>
                  <PrivateRoute path='/favorites' component={Favorites} authed={authed}/>
                  <PublicRoute path='/login' component={Login} authed={authed}/>
                  <Redirect from="*" to="/home" />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import './LiveWorkout.scss';

import workoutData from '../../../helpers/data/workoutData';

class LiveWorkout extends React.Component {
  state = {
    workout: {},
  }

  componentDidMount() {
    const { workoutId } = this.props.match.params;
    workoutData.getSingleWorkout(workoutId)
      .then((resp) => this.setState({ workout: resp.data }))
      .catch((err) => console.error('could not get specific workout: , err'));
  }

  render() {
    return (
      <div className="LiveWorkout">
        <h2>LiveWorkout</h2>
        <Link className="btn btn-outline-dark" to='/home'>Cancel to Home</Link>
        <Link className="btn btn-outline-dark" to='/feedback/:workoutId'>To Post Workout</Link>
      </div>
    );
  }
}

export default LiveWorkout;

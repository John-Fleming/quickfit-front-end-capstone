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

  cancelWorkout = () => {
    const { workoutId } = this.props.match.params;
    workoutData.deleteSingleWorkout(workoutId)
      .then(() => this.props.history.push('/home'))
      .catch((err) => console.error('could not delete workout: ', err));
  }

  render() {
    const { workout } = this.state;
    return (
      <div className="LiveWorkout">
        <h2>Your Workout</h2>
        <div className="row">
          <p className="repsets"><strong>Reps:</strong> {workout.reps}</p>
          <p className="repsets"><strong>Sets:</strong> {workout.sets}</p>
        </div>
        <button className="btn btn-outline-dark" onClick={this.cancelWorkout}>Cancel</button>
        <Link className="btn btn-outline-dark" to='/feedback/:workoutId'>Finish</Link>
      </div>
    );
  }
}

export default LiveWorkout;

import React from 'react';
import { Link } from 'react-router-dom';
import './PostWorkout.scss';

import workoutData from '../../../helpers/data/workoutData';

class PostWorkout extends React.Component {
  state = {
    isChecked: '',
  }

  componentDidMount() {
    const { workoutId } = this.props.match.params;
    workoutData.getSingleWorkout(workoutId)
      .then((resp) => {
        const isChecked = resp.data.isFavorited;
        this.setState({ isChecked });
      })
      .catch((err) => console.error('could not get specific workout: , err'));
  }

  checkboxChange = (e) => {
    e.preventDefault();
    this.setState({ isChecked: !this.state.isChecked });
  }

  patchIsFavorited = () => {
    const { isChecked } = this.state;
    const { workoutId } = this.props.match.params;
    workoutData.updateFavoritedStatus(workoutId, isChecked)
      .then(() => this.props.history.push('/profile'))
      .catch((err) => console.error('could not update favorites status: ', err));
  }

  render() {
    const { isChecked } = this.state;
    return (
      <div className="PostWorkout">
        <div className="header-bg">
          <h2 id="post-workout-header" className="text-center">You did it!</h2>
        </div>
        <div className="feedback-container">
          <div className="feedback-form">
            <h5>Loved this workout?</h5>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="favorites-checkbox" value={isChecked} onChange={this.checkboxChange}/>
              <label className="form-check-label" htmlFor="favorites-checkbox">Add to your favorites</label>
            </div>
          </div>
          <div className="feedback-btn mt-3">
            <Link className="btn btn-outline-light mr-3" to='/home'>Skip</Link>
            <button className="btn btn-outline-light" onClick={this.patchIsFavorited}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PostWorkout;

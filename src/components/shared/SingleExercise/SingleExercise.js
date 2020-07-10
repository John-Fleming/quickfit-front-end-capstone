import React from 'react';
import {
  Collapse,
  CardBody,
  Card,
} from 'reactstrap';
import './SingleExercise.scss';
import PropTypes from 'prop-types';

class SingleExercise extends React.Component {
  static propTypes = {
    exercise: PropTypes.object.isRequired,
  }

  state = {
    isOpen: false,
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { isOpen } = this.state;
    const { exercise } = this.props;

    return (
      <Card className={`SingleExercise text-center ${exercise.typeId}`} onClick={this.toggle}>
        <div className="closed-card single-exercise-content">
          <div className="row">
            <h2 className="mx-auto">{exercise.exerciseName}</h2>
          </div>
          <button onClick={this.toggle} className="btn row">
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>

        <Collapse isOpen={isOpen}>
          <CardBody>
            <div className="exercise-diagram">
              <img src={exercise.diagram} alt="exercise diagram" className="img-fluid"/>
            </div>
            <p className="exercise-description">{exercise.description}</p>
          </CardBody>
        </Collapse>
      </Card>
    );
  }
}

export default SingleExercise;

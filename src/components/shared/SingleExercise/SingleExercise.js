import React from 'react';
import {
  Collapse,
  CardBody,
  Card,
} from 'reactstrap';
import './SingleExercise.scss';

import exerciseShape from '../../../helpers/propz/exerciseShape';

class SingleExercise extends React.Component {
  static propTypes = {
    exercise: exerciseShape.exerciseShape,
  }

  state = {
    isOpen: false,
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { isOpen } = this.state;
    const { exercise } = this.props;

    return (
      <Card className={`SingleExercise ${exercise.typeId}`}>
        <div className="closed-card" onClick={this.toggle}>
          <div className="row single-exercise-content">
            <img src={exercise.diagram} alt="" className="mr-5"/>
            <div className="d-flex align-items-center">
              <h2 className="mb-0">{exercise.exerciseName}</h2>
            </div>
            <button onClick={this.toggle} className="btn ml-auto">
              <i className="fas fa-chevron-down"></i>
            </button>
          </div>
        </div>

        <Collapse isOpen={isOpen}>
          <CardBody>
            {exercise.description}
          </CardBody>
        </Collapse>
      </Card>
    );
  }
}

export default SingleExercise;

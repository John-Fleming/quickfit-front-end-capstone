import React from 'react';
import './ExerciseTypeBuilder.scss';
import {
  Collapse,
  CardHeader,
  CardBody,
  Card,
} from 'reactstrap';

import exerciseData from '../../../helpers/data/exerciseData';
import exerciseTypeShape from '../../../helpers/propz/exerciseTypeShape';

class ExerciseTypeBuilder extends React.Component {
  static propTypes = {
    type: exerciseTypeShape.exerciseTypeShape,
  }

  state = {
    isOpen: false,
    exercises: [],
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  getExercises = () => {
    const { type } = this.props;
    exerciseData.getExerciseByTypeId(type.id)
      .then((resp) => this.setState({ exercises: resp }))
      .catch((err) => console.error('could not get exercises by type: ', err));
  }

  componentDidMount() {
    this.getExercises();
  }

  render() {
    const { isOpen } = this.state;
    const { type } = this.props;

    return (
      <Card className="ExerciseTypeBuilder">
        <CardHeader onClick={this.toggle}>
          <div className="row exercise-builder-content">
            <div className="d-flex align-items-center">
              <h2 className="mb-0">Select Your {type.name} Exercise</h2>
            </div>
            <button onClick={this.toggle} className="btn ml-auto">
              <i className="fas fa-chevron-down"></i>
            </button>
          </div>
        </CardHeader>

        <Collapse isOpen={isOpen}>
          <CardBody>
            radio buttons here
          </CardBody>
        </Collapse>
      </Card>
    );
  }
}

export default ExerciseTypeBuilder;

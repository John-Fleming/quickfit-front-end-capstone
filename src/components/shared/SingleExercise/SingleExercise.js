import React from 'react';
import {
  Collapse,
  Button,
  CardHeader,
  CardBody,
  Card,
} from 'reactstrap';

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
      <Card className="SingleExercise">
        <CardHeader onClick={this.toggle}>
          <div className="row">
            <img src={exercise.diagram} alt="" className="mr-5"/>
            <h2 className="mb-0">{exercise.exerciseName}</h2>
            <Button onClick={this.toggle} className="ml-auto">
              <i className="fas fa-chevron-down"></i>
            </Button>
          </div>
        </CardHeader>

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

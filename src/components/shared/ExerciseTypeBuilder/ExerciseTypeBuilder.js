import React from 'react';
import './ExerciseTypeBuilder.scss';
import {
  Collapse,
  CardHeader,
  CardBody,
  Card,
} from 'reactstrap';

class ExerciseTypeBuilder extends React.Component {
  state = {
    isOpen: false,
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

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

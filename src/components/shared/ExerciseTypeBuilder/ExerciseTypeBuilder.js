import React from 'react';
import PropTypes from 'prop-types';
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
    setSelectedExercises: PropTypes.func.isRequired,
  }

  state = {
    isOpen: false,
    exercises: [],
    selectedExercise: '',
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  exerciseChange = (e) => {
    const { setSelectedExercises } = this.props;
    const exerciseId = e.target.value;
    this.setState({ selectedExercise: exerciseId });
    setSelectedExercises(exerciseId);
  }

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
    const { isOpen, exercises, selectedExercise } = this.state;
    const { type } = this.props;

    const buildRadioButtons = exercises.map((exercise) => (
      <div className="form-check" key={exercise.id}>
        <input
        type="radio"
        name={`${exercise.typeId}Exercises`}
        id={exercise.id}
        value={exercise.id}
        className="form-check-input"
        checked={selectedExercise === exercise.id}
        onChange={this.exerciseChange}
        />
        <label htmlFor={exercise.id}>{exercise.exerciseName}</label>
      </div>
    ));

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
          <div className="form">
            {buildRadioButtons}
          </div>
          </CardBody>
        </Collapse>
      </Card>
    );
  }
}

export default ExerciseTypeBuilder;

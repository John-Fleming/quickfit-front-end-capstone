import React from 'react';
import PropTypes from 'prop-types';
import './ExerciseTypeBuilder.scss';
import {
  Collapse,
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
    selectedExerciseId: '',
    selectedExercise: {},
    isSelected: false,
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  exerciseChange = (e) => {
    const { exercises } = this.state;
    const { setSelectedExercises } = this.props;
    const exerciseId = e.target.value;
    const selectedExercise = exercises.find((x) => x.id === exerciseId);
    this.setState({ selectedExerciseId: exerciseId, selectedExercise, isSelected: true });
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
    const {
      isOpen,
      exercises,
      selectedExerciseId,
      selectedExercise,
      isSelected,
    } = this.state;
    const { type } = this.props;

    const buildRadioButtons = exercises.map((exercise) => (
      <div className="form-check" key={exercise.id}>
        <input
        type="radio"
        name={`${exercise.typeId}Exercises`}
        id={exercise.id}
        value={exercise.id}
        className="form-check-input"
        checked={selectedExerciseId === exercise.id}
        onChange={this.exerciseChange}
        />
        <label htmlFor={exercise.id}>{exercise.exerciseName}</label>
      </div>
    ));

    const buildExercisePreview = () => (
        <div className="">
          <img src={selectedExercise.diagram} alt="selected exercise diagram" className="img-fluid"/>
          <p className="exercise-description">{selectedExercise.description}</p>
        </div>
    );

    return (
      <Card className={`ExerciseTypeBuilder text-center ${type.id}`}>
        <div className="exercise-builder-header" onClick={this.toggle}>
          <div className="row">
            <h2 className="mx-auto">Select Your {type.name} Exercise</h2>
          </div>
          <button onClick={this.toggle} className="btn row">
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>

        <Collapse isOpen={isOpen}>
          <CardBody className="row exercise-builder-content">
            <div className="form row radio-btn-container col-8 offset-2">
              {buildRadioButtons}
            </div>
            { isSelected
              ? buildExercisePreview()
              : <div></div>
              }
          </CardBody>
        </Collapse>
      </Card>
    );
  }
}

export default ExerciseTypeBuilder;

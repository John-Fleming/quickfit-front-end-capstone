import PropTypes from 'prop-types';

const workoutShape = PropTypes.shape({
  UID: PropTypes.string.isRequired,
  coreExercise: PropTypes.string.isRequired,
  isFavorited: PropTypes.bool.isRequired,
  lowerExercise: PropTypes.string.isRequired,
  plyoExercise: PropTypes.string.isRequired,
  reps: PropTypes.number.isRequired,
  sets: PropTypes.number.isRequired,
  upperExercise: PropTypes.string.isRequired,
});

export default { workoutShape };

import PropTypes from 'prop-types';

const exerciseShape = PropTypes.shape({
  exerciseName: PropTypes.string.isRequired,
  diagram: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  typeId: PropTypes.string.isRequired,
});

export default { exerciseShape };

import PropTypes from 'prop-types';

const exerciseTypeShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
});

export default { exerciseTypeShape };

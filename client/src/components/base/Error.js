import PropTypes from 'prop-types';

function Error({ error }) {
  return (
    <p className="border-2 border-black-600 p-4 rounded shadow-sm">
      {error.message}
    </p>
  );
}

Error.propTypes = {
  error: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Error;

import PropTypes from 'prop-types';

function BaseCard({ children }) {
  return (
    <section className="border-2 border-black-600 p-4 rounded shadow-sm">
      {children}
    </section>
  );
}

BaseCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseCard;

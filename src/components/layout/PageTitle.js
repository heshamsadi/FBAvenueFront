import PropTypes from 'prop-types';

/**
 * PageTitle component - displays the page title
 * @param {Object} props
 * @param {string} props.title - The page title
 * @returns {JSX.Element}
 */
function PageTitle({ title }) {
  return (
    <div className="bg-white px-6 py-3">
      <h1 className="text-3xl font-semibold text-gray-700">{title}</h1>
    </div>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;

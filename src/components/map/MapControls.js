import PropTypes from 'prop-types';

/**
 * MapControls component - displays map zoom controls
 * @param {Object} props
 * @param {Function} props.onZoomIn - Zoom in handler
 * @param {Function} props.onZoomOut - Zoom out handler
 * @returns {JSX.Element}
 */
function MapControls({ onZoomIn, onZoomOut }) {
  return (
    <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1">
      <button
        type="button"
        className="bg-white border border-gray-300 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-100 shadow-sm"
        aria-label="Zoom in"
        onClick={onZoomIn}
      >
        +
      </button>
      <button
        type="button"
        className="bg-white border border-gray-300 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-100 shadow-sm"
        aria-label="Zoom out"
        onClick={onZoomOut}
      >
        −
      </button>
    </div>
  );
}

MapControls.propTypes = {
  onZoomIn: PropTypes.func,
  onZoomOut: PropTypes.func,
};

MapControls.defaultProps = {
  onZoomIn: () => {},
  onZoomOut: () => {},
};

export default MapControls;

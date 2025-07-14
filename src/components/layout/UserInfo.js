import PropTypes from 'prop-types';

/**
 * UserInfo component - displays user information in the sidebar
 * @param {Object} props
 * @param {string} props.name - User's name
 * @param {string} props.userRole - User's role
 * @param {string} props.lastConnection - Last connection date/time
 * @returns {JSX.Element}
 */
function UserInfo({ name, userRole, lastConnection }) {
  return (
    <div className="bg-main-blue text-white px-4 py-3">
      <div className="flex justify-between items-start">
        {/* Left side - Name and Role */}
        <div className="flex-1">
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs font-medium ">{userRole}</div>
        </div>
        {/* Right side - Last Connection */}
        <div className="text-right">
          <div className="text-xs text-blue-100 opacity-90">Last connection</div>
          <div className="text-xs text-blue-100 opacity-90">{lastConnection}</div>
        </div>
      </div>
    </div>
  );
}

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  lastConnection: PropTypes.string.isRequired,
};

export default UserInfo;

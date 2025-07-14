import PropTypes from 'prop-types';

/**
 * TableHeader component - displays the sortable column headers for the providers table
 * @param {Object} props
 * @param {string} props.sortField - Currently sorted field
 * @param {string} props.sortDirection - Sort direction ('asc' or 'desc')
 * @param {Function} props.onSort - Sort handler function
 * @param {boolean} props.areAllVisibleSelected - Whether all visible providers are selected
 * @param {boolean} props.areSomeVisibleSelected - Whether some visible providers are selected
 * @param {Function} props.onBulkSelect - Bulk select handler function
 * @returns {JSX.Element}
 */
function TableHeader({ sortField, sortDirection, onSort, areAllVisibleSelected, areSomeVisibleSelected, onBulkSelect }) {
  const columns = [
    { key: 'selected', label: 'Selected', sortable: false },
    { key: 'dateAdded', label: 'Date Added', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'continent', label: 'Continent', sortable: true },
    { key: 'country', label: 'Country', sortable: true },
    { key: 'city', label: 'City', sortable: true },
    { key: 'workspace', label: 'Workspace', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'views', label: 'View', sortable: true },
    { key: 'favorites', label: 'Favorites', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false },
  ];

  const handleSort = (columnKey) => {
    if (onSort) {
      onSort(columnKey);
    }
  };

  const getSortIcon = (columnKey) => {
    if (sortField !== columnKey) {
      return '↕';
    }
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <thead className="bg-gray-50 sticky top-0 z-10">
      <tr className="border-b border-gray-200">
        {columns.map((column) => (
          <th
            key={column.key}
            className={`px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider ${
              column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
            }`}
            onClick={column.sortable ? () => handleSort(column.key) : undefined}
          >
            {column.key === 'selected' ? (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={areAllVisibleSelected}
                  ref={(el) => {
                    if (el) {
                      // eslint-disable-next-line no-param-reassign
                      el.indeterminate = areSomeVisibleSelected && !areAllVisibleSelected;
                    }
                  }}
                  onChange={(e) => onBulkSelect(e.target.checked)}
                  className="h-4 w-4 text-main-blue focus:ring-main-blue border-gray-300 rounded"
                  aria-label="Select all visible providers"
                />
                <span className="ml-2">{column.label}</span>
              </div>
            ) : (
              <>
                {column.label}
                {column.sortable && (
                  <span className="ml-1 text-gray-500">
                    {getSortIcon(column.key)}
                  </span>
                )}
              </>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}

TableHeader.propTypes = {
  sortField: PropTypes.string,
  sortDirection: PropTypes.oneOf(['asc', 'desc']),
  onSort: PropTypes.func,
  areAllVisibleSelected: PropTypes.bool,
  areSomeVisibleSelected: PropTypes.bool,
  onBulkSelect: PropTypes.func,
};

TableHeader.defaultProps = {
  sortField: '',
  sortDirection: 'asc',
  onSort: () => {},
  areAllVisibleSelected: false,
  areSomeVisibleSelected: false,
  onBulkSelect: () => {},
};

export default TableHeader;

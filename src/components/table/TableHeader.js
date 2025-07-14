/**
 * TableHeader component - displays the sortable column headers for the providers table
 * @returns {JSX.Element}
 */
function TableHeader() {
  return (
    <thead className="bg-gray-50 sticky top-0 z-10">
      <tr className="border-b border-gray-200">
        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
          Selected ↕
        </th>
        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
          Date Added ↕
        </th>
        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
          Type ↕
        </th>
        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
          Name ↕
        </th>
        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
          Continent ↕
        </th>
        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
          Country ↕
        </th>
        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
          City ↕
        </th>
        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
          Workspace ↕
        </th>
        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
          Status ↕
        </th>
        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
          View ↕
        </th>
        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
          Favorites ↕
        </th>
        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
}

export default TableHeader;

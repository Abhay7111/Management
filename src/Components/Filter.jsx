import React, { useState } from 'react';

function Filter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    search: '',
    college: '',
    rank: '',
    marks: ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      college: '',
      rank: '',
      marks: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="w-full h-full space-y-3 p-3 bg-white border border-zinc-200 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full px-3 py-1.5 text-sm border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Filter by college..."
            value={filters.college}
            onChange={(e) => handleFilterChange('college', e.target.value)}
            className="w-full px-3 py-1.5 text-sm border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Filter by rank..."
            value={filters.rank}
            onChange={(e) => handleFilterChange('rank', e.target.value)}
            className="w-full px-3 py-1.5 text-sm border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Filter by marks..."
            value={filters.marks}
            onChange={(e) => handleFilterChange('marks', e.target.value)}
            className="w-full px-3 py-1.5 text-sm border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          onClick={handleClearFilters}
          className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default Filter;

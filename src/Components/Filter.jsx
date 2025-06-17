import React, { useState } from 'react';

function Filter() {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [customDate, setCustomDate] = useState('');

  const handleRadioChange = (e) => {
    setSelectedFilter(e.target.value);
    setCustomDate(''); // clear custom date if a radio is selected
    console.log('Selected filter:', e.target.value);
  };

  const handleDateChange = (e) => {
    setCustomDate(e.target.value);
    setSelectedFilter(''); // clear radio if date is selected
    console.log('Selected custom date:', e.target.value);
  };

  return (
    <div className="w-full h-full bg-zinc-100 rounded-lg p-2 overflow-auto">
      <div className="w-full">
        <p className="text-lg w-full flex items-center">
          <span>Students joined date</span>
        </p>

        <div className="w-full grid grid-cols-1 gap-3 mt-3">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="filter"
              id="today"
              value="Today"
              className="cursor-pointer"
              checked={selectedFilter === 'Today'}
              onChange={handleRadioChange}
            />
            <label htmlFor="today" className="cursor-pointer text-sm">Today</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="filter"
              id="thisweek"
              value="This week"
              className="cursor-pointer"
              checked={selectedFilter === 'This week'}
              onChange={handleRadioChange}
            />
            <label htmlFor="thisweek" className="cursor-pointer text-sm">This Week</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="filter"
              id="thismonth"
              value="This Month"
              className="cursor-pointer"
              checked={selectedFilter === 'This Month'}
              onChange={handleRadioChange}
            />
            <label htmlFor="thismonth" className="cursor-pointer text-sm">This Month</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="filter"
              id="thisyear"
              value="This Year"
              className="cursor-pointer"
              checked={selectedFilter === 'This Year'}
              onChange={handleRadioChange}
            />
            <label htmlFor="thisyear" className="cursor-pointer text-sm">This Year</label>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="customDate" className="text-sm font-medium">Choose a specific date</label>
            <input
              type="date"
              id="customDate"
              name="customDate"
              value={customDate}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;

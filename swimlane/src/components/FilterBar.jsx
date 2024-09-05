import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../store/taskSlice';
import '../styles/FilterBar.css';

const FilterBar = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Filter tasks by title..."
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default FilterBar;

import { useState } from 'react';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);

const SortIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/>
    <line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);

const SearchBar = ({ onSearch, onSort, onCategory, categories = [], currentCategory = 'All', currentSort = '' }) => {
  const [searchVal, setSearchVal] = useState('');

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-filter-bar">
      <div className="row g-3 align-items-end">
        {/* Search */}
        <div className="col-12 col-md-5">
          <div className="filter-label">
            <SearchIcon /> Search
          </div>
          <div className="search-input-wrapper">
            <span className="search-icon">
              <SearchIcon />
            </span>
            <input
              type="text"
              id="product-search"
              className="form-control search-input"
              placeholder="Search by name or category..."
              value={searchVal}
              onChange={handleSearch}
              autoComplete="off"
            />
          </div>
        </div>

        {/* Category */}
        <div className="col-6 col-md-3">
          <div className="filter-label">
            <FilterIcon /> Category
          </div>
          <select
            id="category-filter"
            className="form-select filter-select"
            value={currentCategory}
            onChange={(e) => onCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="col-6 col-md-4">
          <div className="filter-label">
            <SortIcon /> Sort by
          </div>
          <select
            id="sort-filter"
            className="form-select filter-select"
            value={currentSort}
            onChange={(e) => onSort(e.target.value)}
          >
            <option value="">Default Order</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="name_asc">Name: A → Z</option>
            <option value="name_desc">Name: Z → A</option>
            <option value="date_desc">Newest First</option>
            <option value="date_asc">Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

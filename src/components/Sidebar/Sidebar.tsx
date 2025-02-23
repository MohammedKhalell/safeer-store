import React from 'react';
import FilterGroup from './FilterGroup/FilterGroup';
import filterOptions from '../../data/filterOptions.json';
import './Sidebar.css';

interface FilterState {
  categories: string[];
  discount: string[];
  price: string[];
  rate: string[];
  color: string[];
}

interface SidebarProps {
  expandedSections: {
    categories: boolean;
    discount: boolean;
    price: boolean;
    rate: boolean;
    color: boolean;
  };
  selectedFilters: FilterState;
  priceRange: {
    min: string;
    max: string;
    applied: {
      min: string;
      max: string;
    };
  };
  totalItems: number;
  toggleSection: (section: 'categories' | 'discount' | 'price' | 'rate' | 'color') => void;
  toggleFilter: (section: keyof FilterState, value: string) => void;
  resetFilters: () => void;
  isFilterSelected: (section: keyof FilterState, value: string) => boolean;
  handlePriceRangeChange: (type: 'min' | 'max', value: string) => void;
  applyPriceRange: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  expandedSections,
  selectedFilters,
  priceRange,
  totalItems,
  toggleSection,
  toggleFilter,
  resetFilters,
  handlePriceRangeChange,
  applyPriceRange
}) => {
  return (
    <aside className="filter-sidebar">
      <div className="sidebar-header">
      <span>Categories</span>
        <h2>Computers</h2>
        <p>{totalItems} Items</p>
      </div>
      
      <div className="filter-header">
        <h3>Filter</h3>
        <button onClick={resetFilters} className="reset-button">Reset Filter</button>
      </div>

      <FilterGroup
        title="Categories"
        type="categories"
        isExpanded={expandedSections.categories}
        onToggle={() => toggleSection('categories')}
        options={filterOptions.categories}
        selectedValues={selectedFilters.categories}
        onFilterChange={(value) => toggleFilter('categories', value)}
      />

      <FilterGroup
        title="Discount"
        type="discount"
        isExpanded={expandedSections.discount}
        onToggle={() => toggleSection('discount')}
        options={filterOptions.discount}
        selectedValues={selectedFilters.discount}
        onFilterChange={(value) => toggleFilter('discount', value)}
      />

      <FilterGroup
        title="Price"
        type="price"
        isExpanded={expandedSections.price}
        onToggle={() => toggleSection('price')}
        options={filterOptions.price}
        selectedValues={selectedFilters.price}
        onFilterChange={(value) => toggleFilter('price', value)}
        priceRange={{
          min: priceRange.min,
          max: priceRange.max,
          onMinChange: (value) => handlePriceRangeChange('min', value),
          onMaxChange: (value) => handlePriceRangeChange('max', value),
          onApply: applyPriceRange
        }}
      />

      <FilterGroup
        title="Rate"
        type="rate"
        isExpanded={expandedSections.rate}
        onToggle={() => toggleSection('rate')}
        options={filterOptions.rate}
        selectedValues={selectedFilters.rate}
        onFilterChange={(value) => toggleFilter('rate', value)}
      />

      <FilterGroup
        title="Color"
        type="color"
        isExpanded={expandedSections.color}
        onToggle={() => toggleSection('color')}
        options={filterOptions.color}
        selectedValues={selectedFilters.color}
        onFilterChange={(value) => toggleFilter('color', value)}
      />
    </aside>
  );
};

export default Sidebar;
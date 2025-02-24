import React from 'react';
import './FilterGroup.scss';

interface FilterOption {
  id: string;
  label: string;
  value: string;
  stars?: number;
  color?: string;
}

interface PriceRangeProps {
  min: string;
  max: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  onApply: () => void;
}

interface FilterGroupProps {
  title: string;
  type: 'categories' | 'discount' | 'price' | 'rate' | 'color';
  isExpanded: boolean;
  onToggle: () => void;
  options: FilterOption[];
  selectedValues: string[];
  onFilterChange: (value: string) => void;
  priceRange?: PriceRangeProps;
}

const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  type,
  isExpanded,
  onToggle,
  options,
  selectedValues,
  onFilterChange,
  priceRange
}) => {
  const renderFilterOption = (option: FilterOption) => {
    if (type === 'rate') {
      return (
        <label key={option.id} className="filter-option rating-option">
          <input
            type="checkbox"
            checked={selectedValues.includes(option.value)}
            onChange={() => onFilterChange(option.value)}
          />
          <span className="stars">
            {Array(option.stars).fill(0).map((_, index) => (
              <img 
                key={index} 
                src={selectedValues.includes(option.value) ? "/icons/star (2).svg" : "/icons/star.svg"} 
                alt="star" 
              />
            ))}
            <span className="empty-stars">
              {Array(5 - (option.stars || 0)).fill(0).map((_, index) => (
                <img key={index} src="/icons/star (1).svg" alt="star" />
              ))}
            </span>
          </span>
          <span className="rate-text">{option.label}</span>
        </label>
      );
    }

    if (type === 'color') {
      return (
        <button
          key={option.id}
          className={`color-option ${selectedValues.includes(option.value) ? 'selected' : ''}`}
          style={{ backgroundColor: option.color }}
          onClick={() => onFilterChange(option.value)}
          aria-label={`Select ${option.label} color`}
        />
      );
    }

    return (
      <label key={option.id} className="filter-option">
        <input
          type="checkbox"
          checked={selectedValues.includes(option.value)}
          onChange={() => onFilterChange(option.value)}
        />
        {option.label}
      </label>
    );
  };

  return (
    <div className={`filter-section ${isExpanded ? 'expanded' : ''}`} data-type={type}>
      <h3 onClick={onToggle}>{title}</h3>
      {type === 'color' ? (
        <div className="color-options">
          {options.map(renderFilterOption)}
        </div>
      ) : (
        <div className="filter-group">
          {options.map(renderFilterOption)}
        </div>
      )}
      {type === 'price' && priceRange && isExpanded && (
        <div className="price-range">
          <input
            type="number"
            className="price-input"
            placeholder="$ Min"
            value={priceRange.min}
            onChange={(e) => priceRange.onMinChange(e.target.value)}
          />
          <input
            type="number"
            className="price-input"
            placeholder="$ Max"
            value={priceRange.max}
            onChange={(e) => priceRange.onMaxChange(e.target.value)}
          />
          <button 
            className="price-button"
            onClick={priceRange.onApply}
          >
            GO
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterGroup;

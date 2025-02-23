import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './Header.css';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const wishlistCount = useSelector((state: RootState) => state.wishlist.items.length);
  const cartCount = useSelector((state: RootState) => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  const compareCount = useSelector((state: RootState) => state.compare.items.length);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch custom event for Products component to listen to
    const searchEvent = new CustomEvent('headerSearch', { detail: searchQuery });
    window.dispatchEvent(searchEvent);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="logo-section">
            <img src="/icons/image 2.svg" alt="Safeer" className="logo" />
          </div>
          
          <div className="location-section">
            <div className="location-icon">
            <img src="/icons/location.svg" alt="location" />
            </div>
            <div className="location-text">
              Deliver To <span>Jordan</span>
            </div>
          </div>

          <form className="search-section" onSubmit={handleSearch}>
            <select className="category-select">
              <option value="all">All</option>
            </select>
            <input 
              type="text" 
              className="search-input" 
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="clear-search" 
                onClick={() => {
                  setSearchQuery('');
                  // Dispatch search event with empty query to clear results
                  const searchEvent = new CustomEvent('headerSearch', { detail: '' });
                  window.dispatchEvent(searchEvent);
                }}
              >
                ×
              </button>
            )}
            <button type="submit" className="search-button">
              <img src="/icons/search-normal.svg" alt="search-normal" />
            </button>
          </form>

          <div className="language-section">
          <img src="/icons/language-square.svg" alt="language-square" />
            <button className="lang-button">العربية</button>
          </div>

          <div className="auth-section">
          <img src="/icons/profile-circle.svg" alt="profile-circle" />
            <button className="auth-button">Login / Sign up</button>
          </div>

          <div className="icons-section">
            <button className="icon-button">
              <img src="/icons/arrange-circle-2.svg" alt="compare" />
              <span className="badge">{compareCount}</span>
            </button>
            <button className="icon-button">
            <img src="/icons/heart.svg" alt="heart" />
            <span className="badge">{wishlistCount}</span>
            </button>
            <button className="icon-button">
            <img src="/icons/bag.svg" alt="bag" />
            <span className="badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>

      <nav className="header-bottom">
        <div className="container">
          <button className="categories-button">
          <img src="/icons/category-2.svg" alt="category-2" />
          All Categories
          <span className="arrow-down"></span>
          </button>
          <ul className="nav-links">
            <li><a href="#">Today's Deals</a></li>
            <li><a href="#">Brand Store</a></li>
            <li><a href="#">Electronics</a></li>
            <li><a href="#">Home & Kitchen</a></li>
            <li><a href="#">Fashion</a></li>
            <li><a href="#">Baby & Toys</a></li>
            <li><a href="#">Beauty Care</a></li>
          </ul>
        </div>
      </nav>

      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="discover">Discover</span>{' '}
              <span className="range">A Range Of Products</span>
              <br />
              <span className="for">For</span>{' '}
              <span className="gaming">Gaming Professionals</span>
            </h1>
            <p className="hero-description">
              Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
              Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever
              Since The 1500s
            </p>
            <button className="discover-button">Discover Now</button>
          </div>
        </div>
        <img className="hero-arrow left" src="/icons/arrow-left.svg" alt="arrow-left" />

        <img className="hero-arrow right" src="/icons/arrow-right.svg" alt="arrow-right" />

      </div>
    </header>
  );
};

export default Header; 
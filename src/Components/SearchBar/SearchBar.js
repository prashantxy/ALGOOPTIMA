import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

const SearchBar = ({ inputValue, setInputValue, allSuggestions, attribute, label }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (inputValue) {
      const filtered = allSuggestions.filter(suggestion =>
        suggestion[attribute]?.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, allSuggestions, attribute]);

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion[attribute]);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="emergency-search-bar" ref={containerRef}>
      <div className='emergency-search-bar-label'>
        <label htmlFor={label}>Select {label}</label>
      </div>
      <input
        id={label}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={`Search ${label}...`}
      />
      {showSuggestions && (
        <ul className="emergency-suggestions-list">
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion[attribute]}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion[attribute]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

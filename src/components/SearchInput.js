import React, { useState, useRef, useEffect } from 'react';
import '../css/search.css';

function SearchInput({ callback }) {
  const [showInput, setShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [inputWidth, setInputWidth] = useState(0);
  const inputRef = useRef(null);

  const handleClick = () => {
    setShowInput(true);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (searchValue) {
      callback(searchValue.toLowerCase());
    }
  }, [searchValue]);

  const handleBlur = () => {
    if (!searchValue) {
      setShowInput(false);
      setInputWidth(0);
    }
  };

  const handleClearInput = () => {
    setSearchValue('');
    setShowInput(false);
    setInputWidth(0);
    callback('');
  };

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
      setInputWidth(150);
    }
  }, [showInput]);

  return (
    <div className="search-box">
      {showInput ? (
        <>
          {searchValue && (
            <a href="#" onClick={handleClearInput}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsj8av9gBqweyrnHGx9NOCzPOl8Q9FrS8qPtBLTW54QdIiBamsR39uJAGOJ1sCdqHKL_o&usqp=CAU"
                alt="Clear"
              />
            </a>
          )}
          <input
            type="text"
            value={searchValue}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={inputRef}
            style={{ width: inputWidth }}
          />
        </>
      ) : (
        <a href="#" onClick={handleClick}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3917/3917754.png"
            alt="Search"
          />
        </a>
      )}
    </div>
  );
}

export default SearchInput;

import React from 'react';
import '../css/pagination.css';

function Pagination({ offset, limit, max, setOffset, setLimit }) {
  const handlePrevClick = () => {
    setLimit(60);
    const newOffset = offset - 60;
    setOffset(newOffset);
  };

  const handleNextClick = () => {
    const remaining = max - (offset + limit);
    const newLimit = remaining < limit ? remaining : limit;

    const newOffset = offset + (60);
    console.log(newOffset);
    setOffset(newOffset);
    setLimit(newLimit);
  };

  return (
    <div className="pagination">
      <button className="pagebutton" disabled={offset === 0} onClick={handlePrevClick}>
        Previous
      </button>
      <button className="pagebutton" disabled={offset + limit + limit> max} onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
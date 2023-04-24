import '../css/pagination.css';
import {useState, React, useEffect} from 'react';



function Pagination({ offset, limit, max, setOffset, setLimit }) {
  const [remaining, setRemaining] = useState(Math.max(max - (offset + limit), 0));

  useEffect(() => {
    setRemaining(Math.max(max - (offset + limit), 0));
  }, [max, offset, limit]);

  const handlePrevClick = () => {
    const newOffset = offset - limit;
    setOffset(newOffset);
  };

  const handleNextClick = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
  };

  return (
    <div className="pagination">
      <button
        className="pagebutton"
        disabled={offset === 0}
        onClick={handlePrevClick}
      >
        ←
      </button>
      <button
        className="pagebutton"
        disabled={remaining === 0}
        onClick={handleNextClick}
      >
        →
      </button>
    </div>
  );
}

export default Pagination;
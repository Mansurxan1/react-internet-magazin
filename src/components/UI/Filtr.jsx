import React, { useState } from "react";

const Filtr = ({ onSort }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Filtr");

  const handleSort = (sortType, label) => {
    onSort({ sortType }); 
    setSelectedFilter(label);
    setIsDropdownOpen(false); 
  };

  const handleReset = () => {
    setSelectedFilter("Filtr"); 
    setIsDropdownOpen(false);
    onSort({ sortType: "" });
  };

  return (
    <section className="filter">
      <button
        className="filter-button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedFilter}
      </button>
      {isDropdownOpen && (
        <div className="dropdown">
          <button onClick={() => handleSort("price_asc", "Pastdan yuqoriga")}>
            Narx: pastdan yuqoriga
          </button>
          <button onClick={() => handleSort("price_desc", "Yuqoridan pastga")}>
            Narx: yuqoridan pastga
          </button>
          <button onClick={() => handleSort("rating_desc", "Reyting")}>
            Reyting
          </button>
          <button onClick={handleReset}>Filtrni tozalash</button>
        </div>
      )}
    </section>
  );
};

export default Filtr;

import { useState } from "react";
import { useTranslation } from "react-i18next";

const Filtr = ({ onSort }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Filtr");
  const { t, i18n } = useTranslation();
  const handleSort = (sortType, label) => {
    onSort({ sortType }); 
    setSelectedFilter(label);
    setIsDropdownOpen(false); 
  };

  const handleReset = () => {
    setSelectedFilter("Filter"); 
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
            {t("pricefromlowtohigh")}
          </button>
          <button onClick={() => handleSort("price_desc", "Yuqoridan pastga")}>
            {t("pricetopdown")}
          </button>
          <button onClick={() => handleSort("rating_desc", "Reyting")}>
          {t("rating")}
          </button>
          <button onClick={handleReset}>{t("filtercleaning")}</button>
        </div>
      )}
    </section>
  );
};

export default Filtr;

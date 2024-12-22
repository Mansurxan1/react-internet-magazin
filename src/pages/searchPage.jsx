import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Products from "../components/UI/Products";
import Loader from "../components/Loader"; 

const SearchPage = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [location]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("q");

    setIsLoading(true); 

    setTimeout(() => {
      if (searchQuery) {
        const results = products.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(results);
      } else {
        setFilteredProducts([]);
      }
      setIsLoading(false);
    }, 1000); 
  }, [location.search, products]);

  return (
    <section className="search__page">
      <div className="container">
        <h1 className="search__title">{t("searchResults")}</h1>
        <div className="search__box">
          {isLoading ? ( 
            <Loader />
          ) : filteredProducts.length > 0 ? (
            <Products products={filteredProducts} />
          ) : (
            <p className="search__no-results">{t("found")}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;

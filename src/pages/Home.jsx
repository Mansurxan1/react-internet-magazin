import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Products from "../components/UI/Products";
import Header from "../components/UI/Header";
import AOS from "aos";
import "aos/dist/aos.css"; 
import Filtr from "../components/UI/Filtr";

const Home = ({ products, categoryProducts }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [productsPerPage, setProductsPerPage] = useState(25);
  const [filteredProducts, setFilteredProducts] = useState(products); 

  const currentPage = parseInt(new URLSearchParams(location.search).get("page")) || 1;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant", 
    });
  }, [currentPage]);

  useEffect(() => {
    const handleResize = () => {
      setProductsPerPage(window.innerWidth >= 1160 ? 25 : 24);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out", 
      once: false, 
    });
  }, []);

  const handleFilter = (filters) => {
    let updatedProducts = [...products];
    if (filters.sortType) {
      switch (filters.sortType) {
        case "price_asc":
          updatedProducts.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          updatedProducts.sort((a, b) => b.price - a.price);
          break;
        case "rating_desc":
          updatedProducts.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }
    setFilteredProducts(updatedProducts);
  };

  const filteredAndPaginatedProducts = filteredProducts.filter((product) => product.stock > 0);
  const totalPages = Math.ceil(filteredAndPaginatedProducts.length / productsPerPage);
  const currentProducts = filteredAndPaginatedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageClick = (page) => {
    navigate(`?page=${page}`);
  };

  const generatePagination = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (startPage > 1) pages.unshift("...");
    if (endPage < totalPages) pages.push("...");
    if (!pages.includes(1)) pages.unshift(1);
    if (!pages.includes(totalPages)) pages.push(totalPages);
    return pages;
  };

  return (
    <div className="main-page">
      <Header categoryProducts={categoryProducts} />
      <main className="container">
        <Filtr onSort={handleFilter} /> 
        <section className="products">
          {filteredAndPaginatedProducts.length > 0 && (
            <Products products={currentProducts} />
          )}
        </section>
        {filteredAndPaginatedProducts.length > productsPerPage && (
          <section className="page__products" data-aos="fade-up">
            {generatePagination().map((page, index) => (
              <button
                key={index}
                onClick={() => page !== "..." && handlePageClick(page)}
                className={`pagination-btn ${currentPage === page ? "active" : ""}`}
                disabled={page === "..."}>
                {page}
              </button>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;

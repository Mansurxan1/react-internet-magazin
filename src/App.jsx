import { useState, useEffect } from "react";
import axios from "axios";
import AppRouter from "./router/AppRouter";
import Loader from "./components/Loader";

const App = () => {
  const [products, setProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const categoriesResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/categories`
        );
        const categories = categoriesResponse.data;
        const allProducts = [];
        const uniqueCategoryProducts = [];
        const categoryPromises = categories.map((category) =>
          axios.get(category.url).then((response) => response.data.products)
        );
        const categoryResults = await Promise.all(categoryPromises);
        categoryResults.forEach((categoryItems) => {
          if (categoryItems.length > 1) {
            uniqueCategoryProducts.push(categoryItems[2]);
          }
          allProducts.push(...categoryItems);
        });
        const shuffledProducts = allProducts.sort(() => Math.random() - 0.5);
        setCategoryProducts(uniqueCategoryProducts);
        setProducts(shuffledProducts);
        setFilteredProducts(shuffledProducts);
      } catch (error) {
        console.error("App error1", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleFilter = ({ sortType }) => {
    let updatedProducts = [...products];
    
    const sortFunctions = {
      price_asc: (a, b) => a.price - b.price,
      price_desc: (a, b) => b.price - a.price,
      rating_desc: (a, b) => b.rating - a.rating,
    };

    if (sortType) {
      updatedProducts.sort(sortFunctions[sortType] || (() => 0));
    }

    setFilteredProducts(updatedProducts); // bu qatorni `handleFilter` funksiyasi ichida saqladik
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <AppRouter
          products={filteredProducts} 
          categoryProducts={categoryProducts}
          onFilter={handleFilter}
        />
      )}
    </>
  );
};

export default App;

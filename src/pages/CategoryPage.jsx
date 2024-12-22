import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/UI/Sidebar";
import Products from "../components/UI/Products";
import { useTranslation } from "react-i18next";

const CategoryPage = ({ isVisible, setSidebarVisible }) => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/category/${categoryName}`
      );

      if (response.data && response.data.products) {
        setProducts(response.data.products);
      } else {
        console.log("Kategoriya sahifa mahsulot olinmadi");
      }
    } catch (error) {
      console.error("categorypage error");
    }
  };
  fetchProducts();
  }, [categoryName]);

  return (
    <section className="category__products">
      <div className="container">
        <Sidebar isVisible={isVisible} setSidebarVisible={setSidebarVisible}/>
        <div className="category__products-head">
          <h2 className="category__products-title">
            {categoryName} {t("products")}
          </h2>
          <div className="category__products-box">
            {products.length === 0 ? (
              <p>{"Loading..."}</p> 
            ) : (
              <Products products={products} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;

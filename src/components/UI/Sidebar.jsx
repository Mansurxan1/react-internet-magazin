import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next"; 
import 'aos/dist/aos.css'; 


const Sidebar = ({ isVisible, setSidebarVisible }) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/categories`
      );
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = () => {
    if (window.innerWidth < 850) {
      setSidebarVisible(false);
    }
  };

  return (
    <div
      className={`sidebar ${isVisible ? "show" : ""}`}
      style={{ display: isVisible ? 'block' : '' }}
    >
      <h3 className="sidebar__title">{t("categories")}</h3>
      <ul className="sidebar__list">
        {categories.map((category) => (
          <li className="sidebar__list-link" key={category.slug}>
            <Link to={`/category/${category.slug}`} onClick={handleCategoryClick}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

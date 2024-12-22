import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import CategoryPage from "../pages/CategoryPage";
import Cart from "../pages/Cart";
import SearchPage from "../pages/SearchPage";
import Footer from "../components/Footer";
import UserForm from "../pages/UserForm";
import ProductDetails from "../pages/ProductDetails";
import Error404 from "../error404/Error404";
import { Provider } from "react-redux";
import { store } from "../app/store";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import { useState } from "react";
import Favorites from "../pages/Favorites";

const AppRouter = ({ products, categoryProducts, onSort }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                categoryProducts={categoryProducts}
                onSort={onSort}
              />
            }
          />
          <Route
            path="/category/:categoryName"
            element={
              <CategoryPage
                isVisible={isSidebarVisible}
                setSidebarVisible={setSidebarVisible}
              />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchPage products={products} />} />
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <ResponsiveNavbar setSidebarVisible={setSidebarVisible} />
        <Footer />
      </Router>
    </Provider>
  );
};

export default AppRouter;

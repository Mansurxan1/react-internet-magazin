import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Features/cart/cartSlice";
import productsReducer from "../Features/products/productsSlice";
import favoritesReducer from "../Features/favoritesSlice/favoritesSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    favorites: favoritesReducer,
  },
});

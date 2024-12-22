import { createSlice } from "@reduxjs/toolkit";

const loadCartItems = () => {
  try {
    const serializedCart = localStorage.getItem("cartItems");
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error("Error: cartSlice", err);
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartItems(),
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        if (existingItem.quantity < newItem.stock) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity -= 1;
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
    incrementQuantity: (state, action) => {
      const { id, stock } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem && existingItem.quantity < stock) {
        existingItem.quantity += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeSelectedItems: (state, action) => {
      const selectedIds = action.payload;
      state.items = state.items.filter(
        (item) => !selectedIds.includes(item.id)
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    purchaseSelectedItems: (state, action) => {
      const selectedIds = action.payload;
      state.items = state.items.filter(
        (item) => !selectedIds.includes(item.id)
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  removeSelectedItems,
  purchaseSelectedItems,
} = cartSlice.actions;

export default cartSlice.reducer;

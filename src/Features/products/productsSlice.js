import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      existingItem ? (existingItem.quantity += 1) :
      state.items.push({ id: action.payload, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items[index].quantity > 1 ? (state.items[index].quantity -= 1) :
        state.items.splice(index, 1);
      }
    },
  },
});
export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity, } = cartSlice.actions;

export default cartSlice.reducer;

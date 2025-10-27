import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  images: string[];
  type: string;
  collectionType: string;
  slug: string;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const findItemIndex = (state: CartState, id: string) =>
  state.items.findIndex(item => item.id === id);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const index = findItemIndex(state, action.payload.id);
      if (index !== -1) {
        // Item already exists → increment quantity
        state.items[index].quantity += action.payload.quantity || 1;
      } else {
        // New item → add with quantity = payload.quantity || 1
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      const index = findItemIndex(state, action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },

    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const index = findItemIndex(state, action.payload.id);
      if (index !== -1 && action.payload.quantity > 0) {
        state.items[index].quantity = action.payload.quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

// Selector for total quantity (count)
export const selectCartTotalQuantity = createSelector(
  (state: { cart: CartState }) => state.cart.items,
  items => items.reduce((sum, item) => sum + item.quantity, 0)
);

// Selector for total cart amount
export const selectCartTotalAmount = createSelector(
  (state: { cart: CartState }) => state.cart.items,
  items => items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export default cartSlice.reducer;
import { RootState } from "@/redux/store";
import { Extras, Size } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  name: string;
  id: string;
  image: string;
  basePrise: number;
  quantity?: number;
  size?: Size;
  extra?: Extras[];
};

type CartState = {
  items: CartItem[];
};

const cartItemsinLocalStorage =   typeof window !== "undefined" ? localStorage.getItem("cartItems") : null;


const initialState: CartState = {
  items: cartItemsinLocalStorage ? JSON.parse(cartItemsinLocalStorage) : [],
  // items :[]
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity = (existingItem?.quantity || 0) + 1;
        existingItem.size = action.payload.size;
        existingItem.extra = action.payload.extra;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCartItem: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          item.quantity! -= 1;
        }
      }
    },

    removeItemFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addCartItem , removeItemFromCart , removeCartItem , clearCart} = CartSlice.actions;
export default CartSlice.reducer;

export const selectCartItems = (state: RootState) => state?.cart?.items;

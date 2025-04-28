import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
};

export interface UserState {
  value: {
    profile: {
      name: string;
      cell: number;
      address: string;
      theme: string;
    };
    bag: (Product & { quantity: number })[];
    wishlist: Product[];
  };
}

const initialState: UserState = {
  value: {
    profile: {
      name: "string",
      cell: 0,
      address: "string",
      theme: "string",
    },
    bag: [],
    wishlist: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      if (
        state.value.wishlist.some((product) => product.id === action.payload.id)
      ) {
        return;
      } else {
        state.value.wishlist.push(action.payload);
      }
    },

    removeFromWishlist: (state, action: PayloadAction<Product>) => {
      if (
        state.value.wishlist.some((product) => product.id === action.payload.id)
      ) {
        state.value.wishlist = state.value.wishlist.filter(
          (product) => product.id !== action.payload.id
        );
      }
    },

    addToBag: (state, action: PayloadAction<Product>) => {
      if (state.value.bag.some((product) => product.id === action.payload.id)) {
        return;
      } else {
        const payloadWithQuantity = {
          ...action.payload,
          quantity: 1,
        };
        state.value.bag.push(payloadWithQuantity);
      }
    },

    removeFromBag: (state, action: PayloadAction<Product>) => {
      if (state.value.bag.some((product) => product.id === action.payload.id)) {
        state.value.bag = state.value.bag.filter(
          (product) => product.id !== action.payload.id
        );
      }
    },

    handleQuantityChange: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      state.value.bag = state.value.bag.map((product) =>
        product.id == action.payload.id
          ? { ...product, quantity: action.payload.quantity }
          : product
      );
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  addToBag,
  removeFromBag,
  handleQuantityChange,
} = userSlice.actions;

export default userSlice.reducer;

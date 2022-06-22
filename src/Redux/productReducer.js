import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bag: [],
  wishlist: []
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToBag: (state, action) => {
      const product = { ...action.payload, quantity: 1 };
      state.bag.length //check if bag is empty?
        ? state.bag.some((e) => e.id === product.id) //if bag is not empty, check if bag has the current product?
          ? state.bag.forEach((e) => {
              e.id === product.id && e.quantity++; //if bag has the product, increase quantity.
            })
          : state.bag.push(product) //if bag don't have the product, push product.
        : state.bag.push(product); // if bag is empty, push product.
    },

    removeFromBag: (state, action) => {
      let newBag = state.bag.filter((product) => {
        return product.id !== action.payload.id;
      });
      state.bag = newBag;
    },

    addToWishlist: (state, action) => {
      if (!state.wishlist.some((i) => i.id === action.payload.id)) {
        const product = { ...action.payload, quantity: 1 };
        state.wishlist.push(product);
      }
    },

    removeFromWishlist: (state, action) => {
      let newWishlist = state.wishlist.filter((product) => {
        return product.id !== action.payload.id;
      });
      state.wishlist = newWishlist;
    },

    changeProductQuantity: (state, action) => {
      const [product, quantity] = action.payload;
      state.bag.forEach((e) => {
        e.id === product.id && (e.quantity = quantity);
      });
    }
  }
});

export const {
  addToBag,
  removeFromBag,
  addToWishlist,
  removeFromWishlist,
  changeProductQuantity
} = productSlice.actions;
export default productSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productReducer";
import profileReducer from "./profileReducer";

const productStore = configureStore({
  reducer: {
    products: productReducer,
    profile: profileReducer
  }
});

export default productStore;

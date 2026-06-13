import { configureStore } from "@reduxjs/toolkit";

import ShopReducer from  "./ShopSlice"

export const store = configureStore({
    reducer:{
        shop: ShopReducer
    }
})
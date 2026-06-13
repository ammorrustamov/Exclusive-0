import { createSlice } from "@reduxjs/toolkit";

const ShopSlicer = createSlice({
    name: "shop",
    initialState:{
        cart:[],
        wishlist:[],
        searchQuery: ""
    },
    reducers:{
        Cart:(state,action)=>{
           if(!state.cart.find(item=> item.id===action.payload.id)) {
            state.cart.push(action.payload)
           }
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
           Wishlist:(state,action)=>{
           if(!state.wishlist.find(item=> item.id===action.payload.id)) {
            state.wishlist.push(action.payload)
           }
        },
           removeFromWishlist:(state, action)=>{
            state.wishlist= state.wishlist.filter(item=> item.id !== action.payload)
        },
        removeFromCart:(state, action)=>{
            state.cart= state.cart.filter(item=> item.id !== action.payload)
        }
    }
})
export const {Cart, Wishlist,  removeFromCart,removeFromWishlist, setSearchQuery} = ShopSlicer.actions

export default ShopSlicer.reducer



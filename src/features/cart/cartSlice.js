import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   items: [],
   subTotal: 0,
   shipping: 0,
   discount: 0,
   total: 0,
}

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, { payload, type }) => {
         state.items.push(payload)
      },
   },
})

// console.log(cartSlice)

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer

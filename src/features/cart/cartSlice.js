import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const defaultState = {
   cartItems: [],
   numItemsInCart: 0,
   cartTotal: 0,
   shipping: 500,
   tax: 0,
   orderTotal: 0,
}

const getCartFromLocalStorage = () => {
   return JSON.parse(localStorage.getItem('cart')) || defaultState
}

const cartSlice = createSlice({
   name: 'cart',
   initialState: getCartFromLocalStorage(),
   reducers: {
      addItem: (state, { payload }) => {
         const { product } = payload
         const item = state.cartItems.find((i) => i.cartID === product.cartID)
         if (item) {
            console.log('added on qty')
            item.qty += product.qty
         } else {
            console.log('Pushed new item')
            state.cartItems.push(product)
         }
         state.numItemsInCart += product.qty
         state.cartTotal += product.price * product.qty
         cartSlice.caseReducers.calculateTotals(state) // Runs when this reducer runs!
         toast.success('Added to the cart!')
      },
      clearCart: (state) => {
         localStorage.setItem('cart', JSON.stringify(defaultState))
         return defaultState
      },
      removeItem: (state, action) => {
         const { cartID } = action.payload
         const item = state.cartItems.find((i) => i.cartID === cartID)
         state.cartItems = state.cartItems.filter(
            (item) => item.cartID !== cartID
         )
         // UPDATE THE TOTALS
         state.numItemsInCart -= item.qty
         state.cartTotal -= item.qty * item.price
         cartSlice.caseReducers.calculateTotals(state) // Runs with state as argument;
         toast.error('Item removed from the cart!')
      },
      editItem: (state, action) => {
         const { cartID, qty } = action.payload
         const item = state.cartItems.find((i) => i.cartID === cartID)

         // UPDATING THE TOTALS
         state.numItemsInCart += qty - item.qty
         state.cartTotal += item.price * (qty - item.qty)
         item.qty = qty
         cartSlice.caseReducers.calculateTotals(state)
         toast.success('Cart updated!')
      },
      calculateTotals: (state) => {
         state.tax = 0.1 * state.cartTotal
         state.orderTotal = state.tax + state.cartTotal + state.shipping
         localStorage.setItem('cart', JSON.stringify(state))
      },
   },
})

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions

export default cartSlice.reducer

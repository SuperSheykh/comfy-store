import React from 'react'
import { useDispatch } from 'react-redux'
import { editItem, removeItem } from '../../features/cart/cartSlice'
import QuantityOptions from '../SingleProduct/QuantityOptions'
import { formatPrice } from '../../utils'

const CartItem = ({ item }) => {
   const { cartID, title, image, price, qty, company, productColor } = item
   const dispatch = useDispatch()

   const removeItemFromCart = () => dispatch(removeItem({ cartID }))
   const handleQty = (e) =>
      dispatch(editItem({ cartID, qty: parseInt(e.target.value) }))
   return (
      <article className='mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0'>
         <img
            src={image}
            alt={title}
            className='h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover'
         />
         <div className='sm:ml-16 sm:w-48'>
            <h3 className='capitalize font-medium'>{title}</h3>
            <h4 className='mt-2 capitalize text-sm text-neutral-content'>
               {company}
            </h4>
            <p className='mt-4 text-sm capitalize flex items-center gap-x-2'>
               color:{' '}
               <span
                  className='badge badge-sm'
                  style={{ backgroundColor: productColor }}
               ></span>
            </p>
         </div>
         <div className='sm:ml-12'>
            <div className='form-control max-w-xs'>
               <label htmlFor='amount' className='label p-0'>
                  <span>Quantity</span>
               </label>
               <select
                  name='amount'
                  id='amount'
                  className='mt-2 select select-base select-bordered select-xs'
                  value={qty}
                  onChange={handleQty}
               >
                  <QuantityOptions number={qty + 5} />
               </select>
            </div>
            <button
               className='mt-2 link link-primary link-hover text-sm'
               onClick={removeItemFromCart}
            >
               remove
            </button>
         </div>
         <p className='font-medium sm:ml-auto'>{formatPrice(price)}</p>
      </article>
   )
}

export default CartItem

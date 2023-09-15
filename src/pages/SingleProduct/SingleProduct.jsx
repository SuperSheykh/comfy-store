import { Link, useLoaderData } from 'react-router-dom'
import { customFetch, formatPrice } from '../../utils'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../../features/cart/cartSlice'
import QuantityOptions from './QuantityOptions'

export const loader =
   (queryClient) =>
   async ({ params: { id } }) => {
      const response = await queryClient.ensureQueryData(singleProductQuery(id))
      const { data: product } = response.data
      return product
   }

const singleProductQuery = (id) => {
   return {
      queryKey: ['singleProduct', id],
      queryFn: () => customFetch(`/products/${id}`),
   }
}

const SingleProduct = () => {
   const product = useLoaderData()
   const {
      id,
      attributes: { image, title, price, company, description, colors },
   } = product

   const [productColor, setProductColor] = useState(colors[0])
   const [qty, setQty] = useState(1)

   const handleQty = (e) => setQty(parseInt(e.target.value))

   const cartProduct = {
      cartID: id + productColor,
      productID: id,
      image,
      title,
      price,
      qty,
      productColor,
      company,
   }
   const dispatch = useDispatch()

   const addToCart = () => dispatch(addItem({ product: cartProduct }))

   return (
      <div>
         <div className='text-md breadcrumbs'>
            <ul>
               <li>
                  <Link to='/'>Home</Link>
               </li>
               <li>
                  <Link to='/products'>Products</Link>
               </li>
            </ul>
         </div>
         {/* PRODUCT DETAILS */}
         <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
            <img
               src={image}
               alt={title}
               className='w-96 h-96 object-cover rounded-lg lg:w-full'
            />
            <div>
               <h1 className='capitalize text-3xl font-bold'>{title}</h1>
               <h4 className='text-xl text-neutral-content font-bold mt-2'>
                  {company}
               </h4>
               <p className='mt-3 text-xl'>{formatPrice(price)}</p>
               <p className='mt-6 leading-8'>{description}</p>
               {/* colors */}
               <div className='mt-6'>
                  <h4 className='text-md font-medium tracking-wider capitalize'>
                     colors
                  </h4>
                  <div className='mt-2'>
                     {colors.map((color) => (
                        <button
                           key={color}
                           type='button'
                           className={`badge w-6 h-6 mr-2 ${
                              color === productColor &&
                              'border-2 border-secondary'
                           }`}
                           style={{ backgroundColor: color }}
                           onClick={() => console.log('color change')}
                        ></button>
                     ))}
                  </div>
                  {/* QUANTITY */}
                  <div className='form-control w-full-max-w-xs'>
                     <label className='label'>
                        <h4 className='text-md font-medium tracking-wider capitalize'>
                           Quantity
                        </h4>
                     </label>
                     <select
                        className='select select-secondary select-bordered select-md w-1/2'
                        value={qty}
                        onChange={handleQty}
                     >
                        <QuantityOptions number={5} />
                     </select>
                  </div>
                  {/* CART BUTTON */}
                  <div className='mt-10'>
                     <button
                        className='btn btn-secondary btn-md'
                        onClick={addToCart}
                     >
                        Add to bag
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default SingleProduct

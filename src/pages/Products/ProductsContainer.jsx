import { useLoaderData } from 'react-router-dom'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import ProductList from './ProductList'
import { useState } from 'react'
import ProductGrid from './ProductGrid'

const ProductsContainer = () => {
   const {
      meta: {
         pagination: { total: totalProducts },
      },
   } = useLoaderData()
   const [layout, setLayout] = useState('grid')

   const setActiveStyles = (pattern) => {
      return `text-xl btn btn-circle btn-sm ${
         pattern === layout
            ? ' btn-primary text-primary-content'
            : 'btn-ghost text-base-content'
      }`
   }

   return (
      <>
         {/* HEADER */}
         <div className='flex justify-between items-center mt-8 border-b border-base-300 pb-5'>
            <h4 className='font-medium text-md'>
               {totalProducts} product{totalProducts > 1 && 's'}
            </h4>
            <div className='flex gap-x-2'>
               <button
                  onClick={() => setLayout('grid')}
                  className={setActiveStyles('grid')}
               >
                  <BsFillGridFill />
               </button>
               <button
                  onClick={() => setLayout('list')}
                  className={setActiveStyles('list')}
               >
                  <BsList />
               </button>
            </div>
         </div>
         {/* PRODUCTS */}
         <div>
            {totalProducts === 0 ? (
               <h5>Sorry, no products matched your search...</h5>
            ) : layout === 'grid' ? (
               <ProductGrid />
            ) : (
               <ProductList />
            )}
         </div>
      </>
   )
}

export default ProductsContainer

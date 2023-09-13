import Loading from '../../components/Loading'
import { customFetch } from '../../utils'
import Filters from './Filters'
import PaginationContainer from './PaginationContainer'
import ProductsContainer from './ProductsContainer'
export const loader = async () => {
   const response = await customFetch('/products')
   const { data: products, meta } = response.data
   console.log(products)
   console.log(meta)
   return { products, meta }
}

const Products = () => {
   return (
      <section>
         <div className='align-element py-16'>
            <Filters />
            <ProductsContainer />
            <PaginationContainer />
         </div>
      </section>
   )
}

export default Products

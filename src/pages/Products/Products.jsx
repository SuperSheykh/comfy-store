import Loading from '../../components/Loading'
import { customFetch } from '../../utils'
import Filters from './Filters'
import PaginationContainer from './PaginationContainer'
import ProductsContainer from './ProductsContainer'
export const loader = async ({ request }) => {
   const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
   ])
   const response = await customFetch('/products')
   const { data: products, meta } = response.data
   return { products, meta, params }
}

const Products = () => {
   return (
      <div>
         <Filters />
         <ProductsContainer />
         <PaginationContainer />
      </div>
   )
}

export default Products

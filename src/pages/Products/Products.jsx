import { customFetch } from '../../utils'
import Filters from './Filters'
import { PaginationContainer } from '../../components'
import ProductsContainer from './ProductsContainer'
export const loader =
   (queryClient) =>
   async ({ request }) => {
      const params = Object.fromEntries([
         ...new URL(request.url).searchParams.entries(),
      ])
      const response = await queryClient.ensureQueryData(
         allProductsQuery(params)
      )
      const { data: products, meta } = response.data
      return { products, meta, params }
   }

const allProductsQuery = (params) => {
   const { search, category, company, sort, price, shipping, page } = params

   return {
      queryKey: [
         'products',
         search ?? '',
         category ?? 'all',
         company ?? 'all',
         sort ?? 'a-z',
         price ?? 100000,
         shipping ?? false,
         page ?? 1,
      ],
      queryFn: () => customFetch('products', { params }),
   }
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

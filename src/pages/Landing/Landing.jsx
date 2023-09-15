import Hero from './Hero'
import { customFetch } from '../../utils/index'
import FeaturedProducts from './FeaturedProducts'

const url = '/products?featured=true'
export const loader = (queryClient) => async () => {
   // Should return only featured products
   try {
      const response = await queryClient.ensureQueryData(featuredProductsQuery)
      const products = await response.data.data
      return { products }
   } catch (error) {
      console.log(error)
      return []
   }
}

const featuredProductsQuery = {
   queryKey: ['featuredProducts'],
   queryFn: () => customFetch(url),
}

const Landing = () => {
   return (
      <div>
         <Hero />
         <FeaturedProducts />
      </div>
   )
}

export default Landing

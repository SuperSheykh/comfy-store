import Hero from './Hero'
import { customFetch } from '../../utils/index'
import FeaturedProducts from './FeaturedProducts'

const url = '/products?featured=true'
export const loader = async () => {
   // Should return only featured products
   try {
      const response = await customFetch(url)
      const products = await response.data.data
      return products
   } catch (error) {
      console.log(error)
      return []
   }
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

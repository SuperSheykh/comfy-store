import Hero from './Hero'
import { customFetch } from '../../utils/index'
import { useLoaderData } from 'react-router-dom'
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
      <section>
         <div className='align-element py-16'>
            <Hero />
            <FeaturedProducts />
         </div>
      </section>
   )
}

export default Landing

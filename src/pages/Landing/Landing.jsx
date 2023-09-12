import Hero from './Hero'
import { customFetch } from '../../utils/index'
import { useLoaderData } from 'react-router-dom'
export const loader = async () => {
   // Should return only featured products
   try {
      const response = await customFetch('/products?featured=true')
      const data = await response.json()

      console.log(data)
   } catch (error) {
      console.log(error)
      return 'Hello, I am the data'
   }
}

const Landing = () => {
   const data = useLoaderData()
   console.log(data)
   return (
      <section>
         <div className='align-element py-16'>
            <Hero />
         </div>
      </section>
   )
}

export default Landing

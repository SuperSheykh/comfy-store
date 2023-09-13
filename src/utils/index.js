import axios from 'axios'

export const customFetch = axios.create({
   baseURL: 'https://strapi-store-server.onrender.com/api',
})
export const formatPrice = (price) => {
   return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
   }).format((price / 100).toFixed(2))
}

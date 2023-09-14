import { toast } from 'react-toastify'
import { customFetch } from '../../utils'
import { redirect } from 'react-router-dom'

export const loader =
   (store) =>
   async ({ request }) => {
      const {
         userState: { user },
      } = store.getState()

      if (!user) {
         toast.error('Please login first.')
         return redirect('/login')
      }

      const params = Object.fromEntries([
         ...new URL(request.url).searchParams.entries(),
      ])

      try {
         const response = await customFetch('/orders', {
            params,
            headers: { Authorization: `Bearer ${user.token}` },
         })
         const {
            data: { data, meta },
         } = response

         return { data, meta }
      } catch (error) {
         console.log(error)
         toast.error('Could not find your orders')
         return redirect('/')
      }
   }

const Orders = () => {
   return (
      <>
         <h1 className='text-4xl font-bold'>Orders</h1>
      </>
   )
}

export default Orders

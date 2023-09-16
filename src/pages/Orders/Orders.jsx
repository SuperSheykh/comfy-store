import { toast } from 'react-toastify'
import { customFetch } from '../../utils'
import { redirect, useLoaderData } from 'react-router-dom'
import {
   ComplexPaginationContainer,
   PaginationContainer,
   SectionTitle,
} from '../../components'
import OrdersList from './OrdersList'

export const loader =
   (store, queryClient) =>
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
         const response = await queryClient.ensureQueryData(
            ordersQuery(params, user)
         )
         const {
            data: { data, meta },
         } = response

         return { orders: data, meta }
      } catch (error) {
         console.log(error)
         toast.error('Could not find your orders')
         return redirect('/')
      }
   }

const ordersQuery = (params, user) => {
   return {
      queryKey: [
         'orders',
         user.username,
         params.page ? parseInt(params.page) : 1,
      ],
      queryFn: () =>
         customFetch('/orders', {
            params,
            headers: { Authorization: `Bearer ${user.token}` },
         }),
   }
}

const Orders = () => {
   const { meta } = useLoaderData()

   if (meta.pagination.total < 1)
      return <SectionTitle text='You have no orders to display' />

   return (
      <>
         <SectionTitle text='Your orders' />
         <OrdersList />
         <ComplexPaginationContainer />
      </>
   )
}

export default Orders

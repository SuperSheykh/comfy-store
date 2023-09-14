import { useSelector } from 'react-redux'
import { SectionTitle } from '../../components'
import CheckoutForm from './CheckoutForm'
import CartTotals from '../Cart/CartTotals'
import { redirect } from 'react-router-dom'
import { customFetch, formatPrice } from '../../utils'
import { clearCart } from '../../features/cart/cartSlice'
import { toast } from 'react-toastify'

export const loader = (store) => async () => {
   const {
      userState: { user },
   } = store.getState()
   if (!user) {
      return redirect('/')
   }
   return null
}

export const action =
   (store) =>
   async ({ request }) => {
      const formData = await request.formData()
      const { name, address } = Object.fromEntries(formData)
      const {
         userState: { user },
         cartState: { cartItems, orderTotal, numItemsInCart },
      } = store.getState()

      const info = {
         user,
         name,
         address,
         cartItems,
         chargeTotal: orderTotal,
         orderTotal: formatPrice(orderTotal),
         numItemsInCart,
      }

      try {
         const response = await customFetch.post(
            '/orders',
            { data: info },
            {
               headers: { Authorization: `Bearer ${user.token}` },
            }
         )
         store.dispatch(clearCart())
         toast.success('Order placed successfully!')
         return redirect('/orders')
      } catch (error) {
         console.log(error)
         const errorMessage =
            error?.response?.data?.error?.message ||
            'there was an error placing your order'
         toast.error(errorMessage)
         if (error?.response?.status === 401 || 403) return redirect('/login')

         return null
      }
   }

const Checkout = () => {
   const { cartTotal } = useSelector((state) => state.cartState)

   if (!cartTotal) {
      return <SectionTitle text='your cart is empty' />
   }
   return (
      <>
         <SectionTitle text='place your order' />
         <div className='mt-8 grid gap-8 md:grid-cols-2 items-start'>
            <CheckoutForm />
            <CartTotals />
         </div>
      </>
   )
}

export default Checkout

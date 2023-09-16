import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './pages/Layout'
import Register from './pages/Register'
import Login from './pages/Login'
import { Error, ErrorElement } from './pages/Error'
import Landing from './pages/Landing'
import About from './pages/About'
import Products from './pages/Products'
import SingleProduct from './pages/SingleProduct'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import { loader as landingLoader } from './pages/Landing/Landing'
import { loader as singleLoader } from './pages/SingleProduct/SingleProduct'
import { loader as productsLoader } from './pages/Products/Products'
import { action as registerAction } from './pages/Register/Register'
import { action as loginAction } from './pages/Login/Login'

import { store } from './store'
import {
   loader as checkoutLoader,
   action as checkoutAction,
} from './pages/Checkout/Checkout'
import { loader as orderLoader } from './pages/Orders/Orders'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 1000 * 60 * 5,
      },
   },
})

const router = createBrowserRouter([
   {
      path: '/',
      element: <Layout />,
      errorElement: <Error />,
      children: [
         {
            index: true,
            loader: landingLoader(queryClient),
            element: <Landing />,
            errorElement: <ErrorElement />,
         },
         {
            path: 'products',
            loader: productsLoader(queryClient),
            element: <Products />,
         },
         {
            path: 'products/:id',
            loader: singleLoader(queryClient),
            element: <SingleProduct />,
         },
         {
            path: 'cart',
            element: <Cart />,
         },
         { path: 'about', element: <About /> },
         {
            path: 'checkout',
            loader: checkoutLoader(store),
            action: checkoutAction(store, queryClient),
            element: <Checkout />,
         },
         {
            path: 'orders',
            loader: orderLoader(store, queryClient),
            element: <Orders />,
         },
      ],
   },
   {
      path: '/login',
      action: loginAction(store),
      element: <Login />,
      errorElement: <Error />,
   },
   {
      path: '/register',
      action: registerAction,
      element: <Register />,
      errorElement: <Error />,
   },
])

const App = () => {
   return (
      <QueryClientProvider client={queryClient}>
         <RouterProvider router={router} />
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   )
}
export default App

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
const router = createBrowserRouter([
   {
      path: '/',
      element: <Layout />,
      errorElement: <Error />,
      children: [
         {
            index: true,
            loader: landingLoader,
            element: <Landing />,
            errorElement: <ErrorElement />,
         },
         {
            path: 'products',
            element: <Products />,
         },
         {
            path: 'products/:id',
            element: <SingleProduct />,
         },
         {
            path: 'cart',
            element: <Cart />,
         },
         { path: 'about', element: <About /> },
         {
            path: 'checkout',
            element: <Checkout />,
         },
         {
            path: 'orders',
            element: <Orders />,
         },
      ],
   },
   {
      path: '/login',
      element: <Login />,
      errorElement: <Error />,
   },
   {
      path: '/register',
      element: <Register />,
      errorElement: <Error />,
   },
])

const App = () => {
   return <RouterProvider router={router} />
}
export default App

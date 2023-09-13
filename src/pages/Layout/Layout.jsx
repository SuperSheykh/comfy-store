import { Outlet, useNavigation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Header from './Header'
import Loading from '../../components/Loading'
const Layout = () => {
   const { state } = useNavigation()
   const isPageloading = state === 'loading'
   return (
      <>
         <Header />
         <Navbar />
         {isPageloading ? (
            <Loading />
         ) : (
            <section className='align-element py-20'>
               <Outlet />
            </section>
         )}
         <Footer />
      </>
   )
}

export default Layout

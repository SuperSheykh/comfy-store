import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Header from './Header'
const Layout = () => {
   return (
      <section className=''>
         <Header />
         <Navbar />
         <Outlet />
         <Footer />
      </section>
   )
}

export default Layout

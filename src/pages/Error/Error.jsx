import { useRouteError, Link } from 'react-router-dom'

const Error = () => {
   const { status } = useRouteError()
   if (status === 404) {
      return (
         <main className=' h-screen grid place-items-center'>
            <div className='text-center grid gap-4 '>
               <h1 className='text-7xl text-primary font-semibold '>404</h1>
               <h3 className='text-3xl font-bold tracking-tight sm:text-5xl'>
                  Page not found
               </h3>
               <p>Sorry, but we couldn't find the page you are looking for.</p>
               <Link to='/' className='btn btn-primary justify-self-center'>
                  Go back home
               </Link>
            </div>
         </main>
      )
   }

   return <h1 className='text-4xl font-bold'>Sorry, there was a problem...</h1>
}

export default Error

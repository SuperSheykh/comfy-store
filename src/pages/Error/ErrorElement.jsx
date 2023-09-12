import { useRouteError } from 'react-router-dom'

const ErrorElement = () => {
   const error = useRouteError()

   return (
      <h4 className='text-4xl font-bold capitalize py-16 text-center'>
         There was an error...
      </h4>
   )
}

export default ErrorElement

import { Form, Link, redirect, useNavigate } from 'react-router-dom'
import { FormInput } from '../../components'
import SubmitBtn from '../../components/SubmitBtn'
import { customFetch } from '../../utils'
import { loginUser } from '../../features/user/userSlice'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

export const action =
   (store) =>
   async ({ request }) => {
      const formData = await request.formData()
      const data = Object.fromEntries(formData)
      try {
         const response = await customFetch.post('/auth/local', data)
         store.dispatch(loginUser(response.data))
         toast.success(`You're logged in!`)
         return redirect('/')
      } catch (error) {
         console.log(error)
         const errorMessage =
            error?.response?.data?.error?.message ||
            'please double check your credentials'

         toast.error(errorMessage)
         return null
      }
   }

const Login = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const loginAsGuestUser = async () => {
      try {
         const response = await customFetch.post('/auth/local', {
            identifier: 'test@test.com',
            password: 'secret',
         })
         dispatch(loginUser(response.data))
         toast.success('Welcome as Gest User')
         navigate('/')
      } catch (error) {
         console.log(error)
         toast.error('Guest user error! Please try later.')
      }
   }

   return (
      <section className='h-screen grid place-items-center'>
         <Form
            method='POST'
            className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
         >
            <h4 className='text-center text-3xl font-bold'>Login</h4>
            <FormInput type='email' label='email' name='identifier' />
            <FormInput type='password' label='password' name='password' />
            <div className='mt-4'>
               <SubmitBtn text='login' />
               <button
                  type='button'
                  className='btn btn-secondary btn-block mt-4'
                  onClick={loginAsGuestUser}
               >
                  guest user
               </button>
            </div>
            <p className='text-center'>
               Not a member yet?
               <Link
                  to='/register'
                  className='ml-2 link link-hover link-primary capitalize'
               >
                  register
               </Link>
            </p>
         </Form>
      </section>
   )
}

export default Login

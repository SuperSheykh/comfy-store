import React from 'react'
import { Form } from 'react-router-dom'
import { FormInput } from '../../components'
import SubmitBtn from '../../components/SubmitBtn'

const CheckoutForm = () => {
   return (
      <Form method='POST' className='flex flex-col gap-y-4'>
         <h4 className='font-medium text-xl'>Shipping Information</h4>
         <FormInput label='first name' name='name' type='text' />
         <FormInput label='address' name='address' type='text' />
         <div className='mt-4'>
            <SubmitBtn text='place your order' />
         </div>
      </Form>
   )
}

export default CheckoutForm

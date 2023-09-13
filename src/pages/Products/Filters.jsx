import React from 'react'
import { Form, Link, useLoaderData } from 'react-router-dom'
import { FormInput, FormRange, FormSelect } from '../../components'
import FormCheckbox from '../../components/FormCheckbox'

const Filters = () => {
   const {
      meta,
      params: { search, company, category, price, order, shipping },
   } = useLoaderData()
   return (
      <Form className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
         {/* SEARCH */}
         <FormInput
            type='search'
            label='search product'
            name='search'
            size='input-sm'
            defaultValue={search}
         />
         {/* CATEGORIES */}
         <FormSelect
            label='select category'
            name='category'
            list={meta.categories}
            size='select-sm'
            defaultValue={category}
         />
         {/* COMPANIES */}
         <FormSelect
            label='select company'
            name='company'
            list={meta.companies}
            size='select-sm'
            defaultValue={company}
         />
         {/* ORDER */}
         <FormSelect
            label='sort by'
            name='order'
            list={['a-z', 'z-a', 'high', 'low']}
            size='select-sm'
            defaultValue={order}
         />
         {/* PRICE RANGE */}
         <FormRange
            label='select price'
            name='price'
            size='range-sm'
            price={price}
         />
         {/* SHIIPING */}
         <FormCheckbox
            label='free shipping'
            name='shipping'
            size='checkbox-sm'
            defaultValue={shipping}
         />
         {/* BUTTONS */}
         <button type='submit' className='btn btn-primary btn-sm'>
            search
         </button>
         <Link to='/products' className='btn btn-accent btn-sm'>
            reset
         </Link>
      </Form>
   )
}

export default Filters

import React, { useState } from 'react'
import { formatPrice } from '../utils'

const FormRange = ({ label, name, size }) => {
   // default values that may change
   const step = 1000
   const maxPrice = 100000
   const [selectedPrice, setSelectedPrice] = useState(maxPrice)
   const handleChange = (e) => {
      setSelectedPrice(e.target.value)
   }
   return (
      <div className='form-control'>
         <label htmlFor={name} className='label cursor-pointer'>
            <span className='label-text capitalize'>{label}</span>
            <span>{formatPrice(selectedPrice)}</span>
         </label>
         <input
            type='range'
            name={name}
            step={step}
            min={0}
            max={maxPrice}
            value={selectedPrice}
            onChange={handleChange}
            className={`range range-primary ${size}`}
         />
         <div className='w-full flex justify-between text-xs px-2 mt-2'>
            <span className='font-bold text-md'>{formatPrice(0)}</span>
            <span className='font-bold text-md'>{formatPrice(maxPrice)}</span>
         </div>
      </div>
   )
}

export default FormRange

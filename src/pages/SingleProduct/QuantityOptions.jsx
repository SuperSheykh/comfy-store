import React from 'react'

const QuantityOptions = ({ number }) => {
   const options = Array.from({ length: number }, (_, index) => {
      const val = index + 1
      return (
         <option key={index} value={val}>
            {val}
         </option>
      )
   })

   return options
}

export default QuantityOptions

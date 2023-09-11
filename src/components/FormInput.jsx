const FormInput = ({ label, type, name, defaultValue }) => {
   return (
      <div className='form-control w-full max-w-xs'>
         <label className='label'>
            <span className='label-text capitalize'>{label}</span>
         </label>
         <input
            type={type}
            name={name}
            defaultValue={defaultValue}
            placeholder='Type here'
            className='input input-bordered w-full max-w-xs'
         />
      </div>
   )
}

export default FormInput

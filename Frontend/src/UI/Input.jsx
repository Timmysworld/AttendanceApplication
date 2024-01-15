const Input = ({label,id,error,register, ...props }) => {

  return (
    <>
        <div className='inputComponent'>
            <label htmlFor={id}>{label}</label>
            <div className="error">{error}</div>
            <input
                id={id}
                {...register}
                {...props}
            />
            
        </div>
    </>
  )
}

export default Input

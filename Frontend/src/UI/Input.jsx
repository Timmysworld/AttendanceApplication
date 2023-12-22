const Input = ({label, id, error, ...props }) => {
  return (
    <>
        <div className=''>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                {...props}
            />
        </div>
        <div className='error'>{error && <p>{error}</p>}</div>
    </>
  )
}

export default Input

const Input = ({label, id, error, ...props }) => {
  return (
    <>
        <div className=''>
            <label htmlFor={id}>{label}</label>
            {error && <p className="error">{error}</p>}
            <input
                id={id}
                {...props}
            />
            
        </div>
    </>
  )
}

export default Input
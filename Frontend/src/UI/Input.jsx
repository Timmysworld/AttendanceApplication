// import { useForm } from 'react-hook-form';
const Input = ({label,id,error,register, ...props }) => {
  //const {errors} = useForm();
  return (
    <>
        <div className='inputComponent'>
            <label htmlFor={id}>{label}</label>
            {/* {error && <p className="error">{error}</p>} */}
            <div className="error">{error}</div>
            <input
                id={id}
                {...register}
                // {...register(name, {required:true})}
                // name={name}
                {...props}
            />
            
        </div>
    </>
  )
}

export default Input

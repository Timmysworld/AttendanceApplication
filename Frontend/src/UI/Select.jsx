
const Select = ({ label, name, value, options, error, onChange,register, ...props }) => {
  return (
    <>
      <div className="selectComponent">
        <label htmlFor={name}>{label}</label>
        {/* {error && <p className='error'>{error}</p>} */}
        <div className="error">{error}</div>
        <select name={name} value={value || ''}  onChange={onChange} {...register}{...props}>
          <option value="" disabled>
            -- Select {label} --
          </option>
          {options &&
            options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
        
      </div>
    </>
  );
};

export default Select;

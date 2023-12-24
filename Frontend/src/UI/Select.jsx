
const Select = ({ label, name, value, options, error, onChange }) => {
  return (
    <>
      <div>
        <label htmlFor={name}>{label}</label>
        {error && <p className='error'>{error}</p>}
        <select name={name} value={value} onChange={onChange}>
          <option value="" disabled>
            -- Select {label} --
          </option>
          {options &&
            options.map((option) => (
              <option key={option.churchId} value={option.churchId}>
                {option.churchName}
              </option>
            ))}
        </select>
        
      </div>
    </>
  );
};

export default Select;

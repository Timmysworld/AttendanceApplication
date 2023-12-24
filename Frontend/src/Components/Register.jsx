import { useEffect, useState } from 'react';
import axios from 'axios';
import Input from '../UI/Input';
import Select from '../UI/Select';
import classes from '../Components/Register.module.css'
import Button from '../UI/Button';
import { isEmail } from '../Utils/Validation';




const Register = () => {

  // State to hold form data
  const [formData, setFormData] = useState({
    UserName: '',
    FirstName: '',
    LastName: '',
    Password: '',
    Email: '',
    Gender: '',
    Church: '',
  });

  // State to display errors
  const [errors, setErrors] = useState({})

  // State to hold church data
  const [churchData, setChurchData] = useState({
    Church: '',
  });


  // Fetch church names from the API when the component mounts
  useEffect(() => {
    const fetchChurchNames = async () => {
      try {
        const response = await axios.get('http://localhost:5180/api/church/allChurches');
        console.log('Full API Response:', response);
        console.log('Fetched church data:', response.data);

        // Check if response.data.$values is an array
        if (Array.isArray(response.data.$values)) {
          setChurchData({ Church: response.data.$values });
        } else {
          console.error('Church data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching church names:', error);
      }
    };
    fetchChurchNames();
  }, []);

  // Log values for debugging
  // console.log('churchData:', churchData);
  // console.log('churchData.Church:', churchData.Church);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    try {

          // Validate email
    if (formData.Email.trim() === '') {
      throw new Error('Email is required');
    }

    if (!isEmail(formData.Email)) {
      throw new Error('Invalid email format');
    }

      // Create a copy of the form data and convert the Church field to a number if it's not an empty string
      const dataToSend = { ...formData, Church: formData.Church === '' ? null : +formData.Church };
  
      // Send a POST request to the registration API endpoint with the adjusted data
      const response = await axios.post('http://localhost:5180/api/account/register', dataToSend);
  
      // Log a success message and the API response data when registration is successful
      console.log('Registration successful:', response.data);
    } catch (error) {
      // Check if the server responded with a 400 status (validation error)
      if (error.response.status === 400) {
        // Log validation errors to the console for debugging
        console.log('Validation errors:', error.response.data.errors);
        setErrors(error.response.data.errors); 
        
        // TODO: Handle validation errors in the UI if needed
      } else {
        // Log other errors (server errors) to the console
        console.error('Registration Failed:', error.response.data);
        // TODO: Handle other errors in the UI if needed
      }
    }
  };

  // Render the registration form
  return (
    <div className='wrapper'>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.heading}>
          <h2 className={classes.heading}>Registration</h2>
          <p className={classes.signIn}>Already have an account <a href='login'>Sign In </a></p>
        </div>

        {/* Render input fields */}
        <div className={classes.formGroup}>
          <Input label='UserName' id='username' type='text' name='UserName' onChange={handleChange} error={errors && errors.Username && errors.Username.join(', ')} />

          <Input label='FirstName' id='firstname' type='text' name='FirstName' onChange={handleChange} error={errors && errors.FirstName && errors.FirstName.join(', ')}  />
          <Input label='LastName' id='lastname' type='text' name='LastName' onChange={handleChange}error={errors && errors.LastName && errors.LastName.join(', ')}  />
        </div>

        <Input label='Email' id='Email' type='email' name='Email' onChange={handleChange}error={errors && errors.Email && errors.Email.join(', ')}  />
        <Input label='Gender' id='gender' type='text' name='Gender' onChange={handleChange}error={errors && errors.Gender && errors.Gender.join(', ')}  />

        {/* Render church dropdown */}
        <Select
          label='Church'
          name='Church'
          value={formData.Church}
          options={churchData.Church || []} // Ensure that options is an array
          error={errors && errors.Church}
          onChange={handleChange}
        />

        <Input label='Password' id='password' type='password' name='Password' onChange={handleChange}error={errors && errors.Password && errors.Password.join(', ')}  />


        {/* Render form action buttons */}
        <p className={classes.formActions}>
          {/* <button className="button button-flat">Reset</button> */}
          <Button className={classes.button}>Register</Button>
        </p>
      </form>
    </div>
  );
};

export default Register;
//TODO: I need to set up reset form button.
//* IMPORTANT: WORKING ON GETTING THE EMAIL TO BE VALIDATED AND ERRORS SHOW BASED ON USER INVALID INPUTS. IN CONSOLE ERROR Register.jsx:94 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'status')
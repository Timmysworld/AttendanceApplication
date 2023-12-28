import {useForm, useController} from 'react-hook-form'
import {useEffect, useState} from 'react'
import Input from '../UI/Input';
import Select from '../UI/Select';
import Button from '../UI/Button';
import classes from '../Components/Register.module.css'
import axios from 'axios';

const Registration = () => {
  // Destructuring values from react-hook-form
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm();

  // Using useController for managing the 'church' and 'gender' fields
  const { field } = useController({ name: 'church', control });
  const { field: gender } = useController({ name: 'gender', control });

  // State for storing church data
  const [churchData, setChurchData] = useState({
    Church: '',
  });

  // Options for the 'gender' select
  const options = [
    { id: 1, value: 'male', label: 'Male' },
    { id: 2, value: 'female', label: 'Female' },
  ];

  // Handling change for the 'gender' select
  const handleSelectChange = (option) => {
    field.onChange(option.value)
  };


  // Fetching church names from an API endpoint
  useEffect(() => {
    const fetchChurchNames = async () => {
      try {
        const response = await axios.get('http://localhost:5180/api/church/allChurches');
  
        // Check if response.data.$values is an array
        if (Array.isArray(response.data.$values)) {
          const transformedChurchData = response.data.$values.map((church) => ({
            value: church.churchId,  // Assuming churchId is the unique identifier
            label: church.churchName,
          }));
  
          setChurchData({ Church: transformedChurchData });
        }
      } catch (error) {
        console.error('Error fetching church names:', error);
      }
    };
    fetchChurchNames();
  }, []);


  // Handling form submission
  const onSubmit = (data) => {
    console.log("form submitted", data)
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={classes.heading}>
          <h2 className={classes.heading}>Registration</h2>
          <p className={classes.signIn}>Already have an account <a href='login'>Sign In </a></p>
        </div>

      <div className={classes.formGroup}>
        <Input 
          label="Username" 
          type='text' 
          id='username' 
          
          register={{...register("username", {
            required: 'Username is required',
            minLength: { value: 5, message: 'Username must be at least 5 characters long' },
            // Add more validation rules as needed
          })}} 
          error={errors.username?.message}/>

        <Input 
          label='First Name' 
          type='text' 
          id='firstname' 
          
          register={{...register("firstname",{
            required: 'First name is required',
            // Add more validation rules as needed
          })}} 
          error={errors.firstname?.message}/>

        <Input 
          label='Last Name' 
          type='text' 
          id='lastname' 
        
          register={{...register("lastname",{
            required: 'Last name is required',
            // Add more validation rules as needed
          })}} 
          error={errors.lastname?.message}/>
          </div>
        
        <div className={classes.formGroup}>
        <Input 
          label='Email' 
          type='email' 
          id='email' 
          register={{...register("email",{
            required: 'Email is required',
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Invalid Email format',
            },
          })}} 
          error={errors.email?.message}/>

        <Select
          label="Gender"
          value={gender.value}
          options={options}
          onChange={handleSelectChange}
          register={{...register("gender",{
            required: 'Please choose a gender'
          })}}
          error={errors.gender?.message}
        />


        <Select
          key={churchData.id}
          label='Church'
          value={field.value}
          onChange={handleSelectChange}
          options={churchData.Church || []} // Ensure that options is an array
          register={{...register('church', {
            required:"Please select a church"
          })}}
          error={errors.church?.message}
          
        />
      </div> 
        <Input
          label='Password'
          id='password' 
          type='password' 
          register={{...register("password",{
            required: 'Password is required',
            minLength:{value: 6, message:'Password must be at least 6 characters long and contain one special character'}
          })}}
          error={errors.password?.message}
          />

        <Input
          label='Confirm Password'
          id='confirmpassword' 
          type='password' 
          register={{...register("confirmpassword",{
            required: 'Confirm Password is required',
            validate:(value)=>{
              if(watch('password') !=value) {
                return "Passwords must match!";
              }
            }
          })}}
          error={errors.confirmpassword?.message}
          />

        <div className=''>
          <p>Forgot Password</p>
        </div>

        <p className={classes.formActions}>
          {/* <button className="button button-flat">Reset</button> */}
          <Button className={classes.button}>Register</Button>
        </p>

      </form>
      
    </>
  )
}

export default Registration

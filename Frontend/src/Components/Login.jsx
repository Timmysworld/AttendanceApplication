import { useRef, useState } from 'react';
import {useForm} from 'react-hook-form'
import Input from '../UI/Input';
import Button from '../UI/Button';
import classes from "../Components/Login.module.css"
import AccountService from '../Services/AccountService';


const Login = () => {
    const {register, handleSubmit,reset, formState:{errors}} = useForm();
    const [error, setErrors] = useState();
    const formRef = useRef();
    // const [error, setErrors] = useState(null);


    const onSubmit = async (data) => {
        console.log("form submitted", data);

        try {
            let response = await AccountService.login(data);
            console.log("Server Response:", response);

            if (response && response.result) {
                // Handle successful login, reset server error state
                setErrors(null);
            } else if (response && response.errors && response.errors.$values) {
                // Set user-friendly error message for specific error types
                const firstError = response.errors.$values[0];
                console.log("First Error:", firstError);

                switch (firstError) {
                    case "Invalid Credentials":
                        setErrors("Invalid username or password. Please try again.");
                        break;
                    case "User doesn't exist":
                        setErrors("User not found. Please create an account.");
                        break;
                    case "Network Error":
                        setErrors("Network error. Please check your internet connection.");
                        break;
                    case "Server Unavailable":
                        setErrors("The server is currently unavailable. Please try again later.");
                        break;
                    default:
                        // Handle other unexpected errors
                        setErrors("An unexpected error occurred. Please try again later.");
                }
            } else {
                // Handle other unexpected cases
                setErrors("An unexpected error occurred. Please try again later.");
            }
        } catch (error) {
            console.error("Error during login:", error);

            // Handle other errors (e.g., network issues) and set the error in state
            setErrors("An unexpected error occurred. Please try again later.");
        }
    };
    
    return ( 
        <>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={classes.heading}>
            <h2 className={classes.heading} >Login</h2>
            <p className={classes.register}> Need an account <a href='register'>Register </a></p>
        </div>

        {error && (
            <div className='error'>
                {Array.isArray(error) ? (
                    error.map((error, index) => <p key={index}>{error}</p>)
                ) : (
                    <p>{error}</p>
                )}
            </div>
            )}
        

        <div className={classes['control-row']}>
            <Input
            label="Username"
            id="username"
            type="text"
            register={{...register("username", {
                required: 'Username is required'
                // Add more validation rules as needed
            })}} 
            error={errors.username?.message}
            />

            <Input
            label="Password"
            id="password"
            type="password"
            register={{...register("password",{
                required: 'Password is required'
            })}}
            error={errors.password?.message}
            
            />
        </div>

        <p className={classes['form-actions']}>
            <Button className={`${classes.button} ${classes['button-flat']}`} type="reset" onClick={() => reset(formRef.current)}>Reset</Button>
            <Button className={classes.button}>Login</Button>
        </p>
        <div className=''>
            <p className=''>Forgot Password? </p>
        </div>
        </form>
        </>
    
    

    )
}

export default Login
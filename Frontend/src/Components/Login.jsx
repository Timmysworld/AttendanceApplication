import { useRef, useState } from 'react';
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import { decodeToken } from '../Utils/AuthUtils';
import Input from '../UI/Input';
import Button from '../UI/Button';
import classes from "../Components/Login.module.css"
import AccountService from '../Services/AccountService';
// import AdminService from '../Services/AdminService';


const Login = () => {
    const {register, handleSubmit,reset, formState:{errors}} = useForm();
    const [error, setErrors] = useState();
    const formRef = useRef();
    const navigate = useNavigate();

//TODO: NEED TO WORK OUT THE BUGS TO HANDLE SERVER ERRORS, USER EXIST, INVALID CREDENTIALS, ALL ARE NOT ABLE TO SHOW PROPERLY ON FRONTEND.
    const onSubmit = async (data) => {
        console.log("form submitted", data);

        try {
            let response = await AccountService.login(data);
            console.log("Server Response:", response);
            console.log('Raw Token:', response.token);

            if (response && response.result) {
                // Handle successful login, reset server error state
                setErrors(null);
                // Decode the JWT token to get user roles and groupId
            const decodedToken = decodeToken(response.token);
            console.log('Decoded Token:', decodedToken);

            // Determine the dashboard URL based on user roles and groupId
            const dashboardUrl = getDashboardUrl(decodedToken);
            console.log('Dashboard URL:', dashboardUrl);

            // Redirect to the dashboard
            navigate(dashboardUrl);
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
    
    //TODO:TODO: NEED TO FIGURE OUT WHY WHEN I ADD API TO THE URL THE PAGE STAYS ON LOGIN SCREEN, BUT CONSOLE SHOWS EVERYTHING IS GOOD. THEN WHEN I REMOVE API FROM APP.JSX IT ROUTES BUT TO BLANK SCREEN, AND CONSOLES SHOWS NO ROUTES MATCHED LOCATION "/API/ADMIN/DASHBOARD
    const getDashboardUrl = (decodedToken) => {
        console.log('Decoded Roles:', decodedToken.role);
        
        const isOverseer = decodedToken.role.includes('Overseer');
        console.log('Is Overseer:', isOverseer);
    
        const hasGroupId = decodedToken.GroupId !== null && decodedToken.GroupId !== undefined;
        console.log('Has GroupId:', hasGroupId);
    
        const dashboardUrl = isOverseer ? '/api/admin/dashboard' : (hasGroupId ? `/api/user/dashboard/${decodedToken.GroupId}` : '/');
        console.log('Dashboard URL:', dashboardUrl);
    
        return dashboardUrl;
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

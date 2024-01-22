import { useRef, useState } from 'react';
import {useForm} from 'react-hook-form'
import {useNavigate, NavLink} from 'react-router-dom'
import { decodeToken, storeToken } from '../Utils/AuthUtils';
import { useAuth } from '../Utils/AuthProvider';
import Input from '../UI/Input';
import Button from '../UI/Button';
import classes from "../Components/Login.module.css"
import AccountService from '../Services/AccountService';



const Login = () => {
    const {register, handleSubmit,reset, formState:{errors}} = useForm();
    const [error, setErrors] = useState();
    const formRef = useRef();
    const navigate = useNavigate();

      // Use the useContext hook to get the current context value
    const authContext = useAuth();


//TODO: NEED TO WORK OUT THE BUGS TO HANDLE SERVER ERRORS, USER EXIST, INVALID CREDENTIALS, ALL ARE NOT ABLE TO SHOW PROPERLY ON FRONTEND.
    const onSubmit = async (data) => {
        console.log("form submitted", data);

        try {
            let response = await AccountService.login(data);
            console.log("Server Response:", response);

            //console.log('Raw Token:', response.token);
            if (response && response.token) {
                const token = response.token;
                storeToken(token);
        
                // Decode the JWT token to get user roles and groupId
                const decodedToken = decodeToken(response.token);
        
                // Set userRoles in the auth state using the context value
                authContext.setToken(token);
                
        
                // Determine the dashboard URL based on user roles and groupId
                const dashboardUrl = getDashboardUrl(decodedToken);
        
                // Redirect to the dashboard
                navigate(dashboardUrl);
            } else if (response && response.errors && response.errors.$values) {
            // Handle specific error types
            const firstError = response.errors.$values[0];
            handleServerError(firstError);
            } else {
            // Handle other unexpected cases
            setErrors("An unexpected error occurred. Please try again later.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrors("An unexpected error occurred. Please try again later.");
        }
    };

    const handleServerError = (errorType) => {
        switch (errorType) {
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
    };

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
            <p className={classes.register}> Need an account <NavLink to='/api/account/register'>Register </NavLink></p>
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
            <NavLink to=''> <p className=''>Forgot Password </p></NavLink>
        </div>
        </form>
        </>
    )

}

export default Login

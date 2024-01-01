// Import necessary libraries
import Cookies from 'js-cookie';
import  {jwtDecode}  from 'jwt-decode';

// Define the token key
const TOKEN_KEY = 'authToken';

// Decode the token using jwt-decode library
// const decoded = jwtDecode(token);

// Function to store the token in a cookie
// Set the token as an HTTP cookie with a 1-day expiration
export const storeToken = (token) => {
    //console.log('Token to be stored:', token);
    Cookies.set(TOKEN_KEY, token, { expires: 1 });
};

// Function to retrieve the token from the cookie
export const retrieveToken = () => {
    const token = Cookies.get(TOKEN_KEY);
    //console.log('Retrieved Token:', token); // Log the retrieved token
    return token;
};

// Function to clear the token from the cookie
export const clearToken = () => {
Cookies.remove(TOKEN_KEY);
};

// Function to decode the token (you may need to use jwt-decode library)
export const decodeToken = (token) => {
// Implement actual decoding using jwt-decode library
try {
    if(!token || typeof token !== 'string'){
        throw new Error('Invalid token specified: must be a string');
    }
    const decodedToken = jwtDecode(token);
    return decodedToken;
} catch (error) {
    console.error('Error decoding token:', error);
    return null;
}
};

// Function to get user roles from the decoded token
export const getUserRoles = () => {
const token = retrieveToken();
if (token) {
    const decodedToken = decodeToken(token);
    return decodedToken ? decodedToken.role || [] : [];
}
return [];
};



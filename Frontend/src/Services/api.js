import axios from 'axios';
import { retrieveToken } from '../Utils/AuthUtils';

const baseURL = 'http://localhost:5180/api';
const httpClient = axios.create({
    baseURL: 'http://localhost:5180/api/'
});

// Add an interceptor to include the Authorization header in all requests
httpClient.interceptors.request.use(
    (config) => {
        const token = retrieveToken('token'); // Replace with your token retrieval logic
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const handleApiResponse = function (httpResponse){
    if (httpResponse.status >= 200 && httpResponse.status < 300) {
        return {
        isSuccess: true,
        isError: false,
        isValidationError: false,
        data: httpResponse.data,
        error: null,
        validationErrors: null
        }
    }
}

const handleExceptionApiResponse = function (axiosError){
    if(axiosError.response && axiosError.response.status === 400){
        return {
            statusCode: axiosError.response.status,
            isSuccess: false,
            isError: false,
            isValidationError: true,
            data: null,
            error: axiosError.request.response,
            validationErrors: axiosError.response.data.errors
        }
    }
    else if (axiosError.response){
        return{
            statusCode: axiosError.response.status,
            isSuccess: false,
            isError: true,
            isValidationError: false,
            data: null,
            error: "INTERNAL_SERVER_ERROR",
            validationErrors: null
        }
    }
}
const api = (axios) => {
    const baseUrl = baseURL;
    return{
        getById: async (url,config = {})=> {
            try {
                var response = await axios.get(baseUrl + url, config);
                return handleApiResponse(response);
            }catch (event){
                return handleExceptionApiResponse(event);
            }
        },
        get: async (url, config = {}) => {
            try {
                var response = await axios.get(baseUrl + url, config);
                return handleApiResponse(response);
            } catch (e) {
                console.error('HTTP Error:', e); 
                return handleExceptionApiResponse(e);
            }
        },
        post: async (url, body, config = {}) => {
            try {
            var response = await axios.post(baseUrl + url, body, config);
            return handleApiResponse(response);
            } catch (e) {
            return handleExceptionApiResponse(e);
            }
        },
        put: async (url, body, config = {}) => {
            try {
            var response = await axios.put(baseUrl + url, body, config);
            return handleApiResponse(response);
            } catch (e) {
            return handleExceptionApiResponse(e);
            }
        },
        delete: async (url, config = {}) => {
            try {
            var response = await axios.delete(baseUrl + url, config);
            return handleApiResponse(response);
            } catch (e) {
            return handleExceptionApiResponse(e);
            }
        }
    };
};

export const httpSmartClient = api(httpClient);
export default httpClient;
import { httpSmartClient } from "./api";

const baseName = 'account';

const AccountService = {
    register: async (data) => {
        try{
            var response = await httpSmartClient.post(`/${baseName}/register`, data);
            return response ? response.data : { status: 'Failed', errors: ['An unexpected error occurred.'] };
        }catch (error){
            console.error('Error in register:', error);
            throw error;
        }
    },
    login: async (credentials)=>{
        try{
            var response = await httpSmartClient.post(`/${baseName}/login`, credentials);
            return response ? response.data : {status: 'Failed', errors:['An unexpected error occurred.']};
        }catch (error){
            console.error('Error in login:', error);
            throw error;
        }
    }
}
export default AccountService;
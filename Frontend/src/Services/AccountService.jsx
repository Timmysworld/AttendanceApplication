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
    }
}
export default AccountService;
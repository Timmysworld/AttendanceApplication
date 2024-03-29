import { httpSmartClient } from "./api";

const baseName = 'admin';

const AdminService ={
    dashboard: async (data) => {
        try{
            var response = await httpSmartClient.get(`/${baseName}/dashboard`, data);
            return response ? response.data : { status: 'Failed', errors: ['An unexpected error occurred.'] };
        }catch (error){
            console.error('Error in dashboard:', error);
            throw error;
        }
    },
    }
    export default AdminService;
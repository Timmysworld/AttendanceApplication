import { httpSmartClient } from "./api";

const baseName = 'church';

const ChurchService ={
    allMembers: async (data) => {
        try{
            var response = await httpSmartClient.get(`/${baseName}/allMembers`, data);
            return response ? response.data : { status: 'Failed', errors: ['An unexpected error occurred.'] };
        }catch (error){
            console.error('Error in dashboard:', error);
            throw error;
        }
    },
    }
    export default ChurchService;
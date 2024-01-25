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
    getChurchById: async (ChurchId) => {
        try {
            const response = await httpSmartClient.getById(`/${baseName}/${ChurchId}`);
            
            console.log('API Response:', response);
    
            if (response && response.isSuccess) {
                return {
                    isSuccess: true,
                    data: response.data,
                };
            } else {
                console.error('API request failed:', response && response.errors);
                return {
                    isSuccess: false,
                    errors: response && response.errors ? response.errors : ['An unexpected error occurred.'],
                };
            }
        } catch (error) {
            console.error('Error in getChurchById:', error);
            return {
                isSuccess: false,
                errors: ['An unexpected error occurred.'],
            };
        }
    },
    allChurches: async (data) => {
        try{
            var response = await httpSmartClient.get(`/${baseName}/allChurches`, data);
            return response ? response.data : { status: 'Failed', errors: ['An unexpected error occurred.'] };
        }catch (error){
            console.error('Error in dashboard:', error);
            throw error;
        }
    },
    
    
    
    }
    export default ChurchService;
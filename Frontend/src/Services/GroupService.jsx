import { httpSmartClient } from "./api";

const baseName = 'group';

const GroupService ={
    allGroups: async (data)=>{
        try {
            var response = await httpSmartClient.get(`/${baseName}/allGroups`, data)
            return response ? response.data : {status: 'Failed', errors: [ 'An unexpected error occurred.'] };
        } catch (error) {
            console.error('Error:', error);
        }
    }
}
export default GroupService;
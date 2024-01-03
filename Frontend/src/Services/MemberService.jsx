import { httpSmartClient } from "./api";

const baseName = 'member';

const MemberService ={
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
    export default MemberService;
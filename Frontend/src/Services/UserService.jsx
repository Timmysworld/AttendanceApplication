import { httpSmartClient } from "./api";

const baseName = 'user';

const UserService ={
    allUsers: async (data) => {
        try{
            var response = await httpSmartClient.get(`/${baseName}/allUsers`, data);
            return response ? response.data : { status: 'Failed', error:['An unexpected error occurred.']};
        }catch (error){
            console.error('Error in UserService:', error);
            throw error;
        }
    },
    user: async(userId)=>{
        try {
            var response = await httpSmartClient.getById(`/${baseName}/profile/${userId}`);
            return response ? response.data : { status: 'Failed', error:['An unexpected error occurred.']};
        } catch (error) {
            console.error('Error in UserService: with user ', error);
            throw error;
        }
    }
}
export default UserService;
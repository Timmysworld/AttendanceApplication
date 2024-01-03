import {  useEffect, useState } from 'react';
import { getUserRoles } from '../Utils/AuthUtils';
import {Box} from "@mui/material"
import DashboardLayout from '../Layouts/DashboardLayout';
import Header from '../Components/Header';


const Dashboard = () => {
  // State to hold user roles
    const [userRoles, setUserRoles] = useState(getUserRoles());

    useEffect(() => {
        // Fetch and set user roles when the component mounts
        const fetchUserRoles = async () => {
          try {
            const roles = await getUserRoles();
            console.log('User Roles:', roles);
            setUserRoles(roles);
          } catch (error) {
            // Handle errors if any
            console.error('Error fetching user roles:', error);
          }
        };
    
        fetchUserRoles();
      }, []);

  return (
    <DashboardLayout allowedRoles={['Overseer', 'GroupLeader']}>
      {/* Your dashboard content based on userRoles */}
      {userRoles.includes('Overseer') && (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Admin Dashboard" subtitle="Welcome to your dashboard"/>
        </Box>
        </>
        
      )}
      {userRoles.includes('GroupLeader') && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Group Leader Dashboard" subtitle="Welcome to your dashboard"/>
        </Box>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;

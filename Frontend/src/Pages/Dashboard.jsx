import {  useEffect, useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import { getUserRoles } from '../Utils/AuthUtils';


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
        <h1>Welcome to the ADMIN Dashboard</h1>
      )}
      {userRoles.includes('GroupLeader') && (
        <h1>Welcome to the USER Dashboard</h1>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;

import { useEffect, useState } from 'react';
//import { Box } from '@mui/material';
import DashboardLayout from '../Layouts/DashboardLayout';
import Header from '../Components/Header';
import { getUserRoles } from '../Utils/AuthUtils';

const Dashboard = () => {
  // State to hold user roles
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    // Fetch and set user roles when the component mounts
    const fetchUserRoles = async () => {
      try {
        const roles = await getUserRoles();
        setUserRoles(roles);
        console.log('Dashboard User:', roles);
      } catch (error) {
        // Handle errors if any
        console.error('Error fetching user roles:', error);
      }
    };

    fetchUserRoles();
  }, []);

  return (
    <DashboardLayout userRoles={userRoles}>
      {({ userRoles }) => (
        <>
          <Header
            title={userRoles.includes('Overseer') ? 'Admin Dashboard' : 'Group Leader Dashboard'}
            subtitle="Welcome to your dashboard"
          />
          {/* Additional content based on user roles can be added here */}

        </>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;

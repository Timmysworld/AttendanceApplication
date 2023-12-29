import { useEffect, useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import { getUserRoles } from '../Utils/AuthUtils';


const DashboardPage = () => {
  // State to hold user roles
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    // Fetch and set user roles when the component mounts
    const roles = getUserRoles();
    setUserRoles(roles);
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <DashboardLayout allowedRoles={['Overseer']} >
      {/* Your dashboard content based on userRoles */}
      <h1>Welcome to the Dashboard</h1>
      {userRoles.includes('Overseer') && <p>Admin-specific content</p>}
      {/* {userRoles.includes('manager') && <p>Manager-specific content</p>} */}
      {/* ... other dashboard content */}
    </DashboardLayout>
  );
};

export default DashboardPage;

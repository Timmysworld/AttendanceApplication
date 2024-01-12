
import { Box } from '@mui/material';
import Header from '../Components/Header';
import { useAuth } from '../Utils/AuthProvider';


const Dashboard = () => {
  const { userRoles } = useAuth();

  return (
    
        <>
        <Box>
          <Header
            title={userRoles.includes('Overseer') ? 'Admin Dashboard' : 'Group Leader Dashboard'}
            subtitle="Welcome to your dashboard"
            />
        </Box>
          {/* Additional content based on user roles can be added here */}

        </>
  );
};

export default Dashboard;

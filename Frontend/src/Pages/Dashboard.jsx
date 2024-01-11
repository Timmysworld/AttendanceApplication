
import { Box } from '@mui/material';
import DashboardLayout from '../Layouts/DashboardLayout';
import Header from '../Components/Header';



const Dashboard = () => {

  return (
    <DashboardLayout>
      {({ userRoles }) => (
        <>
        <Box>
          <Header
            title={userRoles.includes('Overseer') ? 'Admin Dashboard' : 'Group Leader Dashboard'}
            subtitle="Welcome to your dashboard"
            />

        </Box>
          {/* Additional content based on user roles can be added here */}
        <h1>HELLO WORLD</h1>

        </>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;

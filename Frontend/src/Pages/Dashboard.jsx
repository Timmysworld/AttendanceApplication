
import { Box} from '@mui/material';
import Header from '../Components/Header';
import { useAuth } from '../Utils/AuthProvider';
import Snapshot from '../Components/Snapshot';


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
        <Snapshot/>
        </>
  );
};

export default Dashboard;


import {Box, useTheme} from '@mui/material';
import { useAuth } from '../Utils/AuthProvider';
import { tokens } from "../theme";
import Header from '../Components/Header';
import Snapshot from '../Components/Snapshot';


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userRoles } = useAuth();

  return (
    
        <>
        <Box>
          <Header
            title={userRoles.includes('Overseer') ? 'Admin Dashboard' : 'Group Leader Dashboard'}
            subtitle="Welcome to your dashboard"
            />
        </Box>
        <Box display="grid"
          gridTemplateColumns="repeat(12,1fr)"
          gridAutoRows="135px"
          gap="10px"
          >
          <Box 
            gridColumn="span 3" 
            backgroundColor={colors.primary[400]} 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
          >
            <Snapshot 
              title="100"
              subtitle="Total Members"
              progress="0.75"
              increase= "+14%"
              />
          </Box>
          <Box 
            gridColumn="span 3" 
            backgroundColor={colors.primary[400]} 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
          >
            <Snapshot 
              title="100"
              subtitle="Total Members"
              progress="0.75"
              increase= "+14%"
              />
          </Box>
          <Box 
            gridColumn="span 3" 
            backgroundColor={colors.primary[400]} 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
          >
            <Snapshot 
              title="100"
              subtitle="Total Members"
              progress="0.75"
              increase= "+14%"
              />
          </Box>
          <Box 
            gridColumn="span 3" 
            backgroundColor={colors.primary[400]} 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
          >
            <Snapshot 
              title="100"
              subtitle="Total Members"
              progress="0.75"
              increase= "+14%"
              />
          </Box>
          </Box>
        </>
  );
};

export default Dashboard;

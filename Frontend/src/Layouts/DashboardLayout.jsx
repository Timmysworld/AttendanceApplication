import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebarr from '../Components/Sidebarr';
import Navbar from '../Components/Navbar';
import classes from "../Layouts/DashboardLayout.module.css";
import ErrorBoundary from '../ErrorBoundary';
import { useAuth } from '../Utils/AuthProvider';
import { Box } from '@mui/material';
import { Outlet } from "react-router-dom";


const DashboardLayout = () => {
  // State to management
  const { token } = useAuth(); 
  const navigate = useNavigate();
  const [isSidebar, setIsSidebar] = useState(true);

  


  useEffect(() => {
    if (!token && window.location.pathname !== '/api/account/login') {
      navigate('/api/account/login');
    }
  }, [token, navigate]);


  return (
    <>
  
      <ErrorBoundary fallback={<p>Something went wrong</p>}>

        <main className={classes.layout}>
          <Sidebarr isSidebar={isSidebar} />
          <Box className={classes.content}>
            <Navbar setIsSidebar={setIsSidebar} />
            <Outlet/>
          </Box>
        </main>

      
      </ErrorBoundary>
    </>
      
    
  );
};

export default DashboardLayout;
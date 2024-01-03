import { useEffect,useState } from 'react';
import { retrieveToken } from "../Utils/AuthUtils";
import { useNavigate } from 'react-router-dom';
import Sidebarr from '../Components/Sidebarr';
import Navbar from '../Components/Navbar';
import classes from "../Layouts/DashboardLayout.module.css";
import ErrorBoundary from '../ErrorBoundary';

const DashboardLayout = ({ children }) => {
  // State to management
  const token = retrieveToken();
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


      <div className={classes.layout}>
        <main className={classes.content}>
          <Sidebarr isSidebar={isSidebar} />
        <div>
          <Navbar setIsSidebar={setIsSidebar} />
          {children}
        </div>
        </main>
      </div>
      
      </ErrorBoundary>
    </>
      
    
  );
};

export default DashboardLayout;
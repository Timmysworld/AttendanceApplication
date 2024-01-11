import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebarr from '../Components/Sidebarr';
import Navbar from '../Components/Navbar';
import classes from "../Layouts/DashboardLayout.module.css";
import ErrorBoundary from '../ErrorBoundary';
import { useAuth } from '../Utils/AuthProvider';

const DashboardLayout = ({ children}) => {
  // State to management
  const { token, userRoles } = useAuth(); 
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
          {/* {children({ userRoles })} */}
          {typeof children === 'function' ? children({ userRoles }) : null}
        </div>
        </main>
      </div>
      
      </ErrorBoundary>
    </>
      
    
  );
};

export default DashboardLayout;
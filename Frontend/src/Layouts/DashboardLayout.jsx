import { useEffect } from 'react';
import { retrieveToken } from "../Utils/AuthUtils";
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';

const DashboardLayout = ({ children }) => {
  const token = retrieveToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && window.location.pathname !== '/api/account/login') {
      navigate('/api/account/login');
    }
  }, [token, navigate]);

  return (
    <div>
        <Navbar/>
        <Sidebar/>
    
      <main>
        {children}
      </main>
    </div>
    
  );
};

export default DashboardLayout;
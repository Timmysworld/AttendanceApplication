import { retrieveToken } from "../Utils/AuthUtils"
import {Navigate} from 'react-router-dom'

const DashboardLayout = ({children}) => {
    const token =retrieveToken();

    if(!token){
        return <Navigate to='/api/account/login'/>
    }

      // Redirect if the user doesn't have the required role
    // if (!hasPermission(allowedRoles)) {
    //     return <Redirect to="/unauthorized" />;
    // }


  return (
    <div>
        <header>DashboardLayout</header>
        <nav></nav>
        <main>
            {children}
        </main>
    </div>
  )
}

export default DashboardLayout
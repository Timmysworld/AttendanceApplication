import './App.css'
import { Routes, Route, Outlet } from 'react-router-dom';
import Home  from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import DashboardLayout from './Layouts/DashboardLayout';
import Dashboard from './Pages/Dashboard';
import Members from './Pages/Members/Members';
import Profile from './Pages/Profile';

import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import UserManagement from './Pages/UserManagement';
//import Create from './Pages/Members/Create';
import Create2 from './Pages/Members/Create2';

function App() {
  const [theme, colorMode] = useMode();


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/api/account/register" element={<Register/>}></Route>
        <Route path="/api/account/login" element={<Login/>}></Route>

        <Route path="/api/admin/*" element={<DashboardLayout   /> }>
            <Route  element={<Outlet />}/>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path="members" element={<Members />} />
                <Route path="members/create" element={<Create2/>}/>
              <Route path="user-management" element={<UserManagement/>}/>
              <Route path="profile/:userId" element={<Profile/>}/>
        </Route>

        <Route path="/api/user/*" element={<DashboardLayout   /> }>
            <Route  element={<Outlet />}/>
              <Route path='dashboard/:groupId' element={<Dashboard />} />
              <Route path="members" element={<Members />} />
        </Route>
      </Routes>
    </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App

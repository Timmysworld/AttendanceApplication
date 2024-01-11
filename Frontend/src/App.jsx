import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home  from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import DashboardLayout from './Layouts/DashboardLayout';
import Dashboard from './Pages/Dashboard';
import Members from './Pages/Members';

import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

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
        <Route path="/api/admin/*" element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="members" element={<Members />} />
        </Route>
        <Route path="/api/user/*" element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="members" element={<Members />} />
        </Route>
        <Route path="/api/member/allMembers" element={<Members />} />
      </Routes>

    </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App

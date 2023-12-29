import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home  from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Pages/Dashboard';

function App() {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/api/account/register" element={<Register/>}></Route>
      <Route path="/api/account/login" element={<Login/>}></Route>
      <Route path="admin/dashboard" element={<Dashboard/>}></Route>
      <Route path="/api/user/dashboard/:groupId" element={<Dashboard/>}></Route> 
      </Routes>
                
            
      </Router>
  )
}

export default App

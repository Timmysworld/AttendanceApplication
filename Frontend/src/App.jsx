import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home  from './Components/Home';
import Registration from './Components/Registration';
import Login from './Components/Login';

function App() {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/api/account/register" element={<Registration/>}></Route>
      <Route path="/api/account/login" element={<Login/>}></Route>
      </Routes>
                
            
      </Router>
  )
}

export default App

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home  from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';

function App() {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/api/account/register" element={<Register/>}></Route>
      <Route path="/api/account/login" element={<Login/>}></Route>
      </Routes>
                
            
      </Router>
  )
}

export default App

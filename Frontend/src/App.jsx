import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home  from './Components/Home';
import Register from './Components/Register';

function App() {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/api/account/register" element={<Register/>}></Route>
      </Routes>
                
            
      </Router>
  )
}

export default App

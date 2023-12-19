
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
function App() {

  return (
    <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                {/* <Route path="/account" component={Account} /> */}
                {/* Add other routes as needed */}
            </Switch>
        </Router>
  )
}

export default App

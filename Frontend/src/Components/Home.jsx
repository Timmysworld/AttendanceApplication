import { Link } from "react-router-dom"
import Button from "../UI/Button"

const Home = () => {
  return (
    <>
    <div className="wrapper">
      <div className="index-page">
        <h1 className="index-heading">The Gospel Mission</h1>
        <div>
          <p className="index-subheading"> Attendance Tracker </p>
        </div>
        <div className="index-actions">
          <Link to='api/account/register'><Button>Register</Button></Link>
          <Link to='api/account/login'><Button>Login</Button></Link>
      </div>
      </div>  
    </div>
      
    </>

  )
}

export default Home
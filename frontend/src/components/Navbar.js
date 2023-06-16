import { Link } from "react-router-dom"
import useLogout from "../hooks/useLogout"

const Navbar = () => {
  const {logout} = useLogout()
  
  const handleLogout = (e) => {
    logout()
  }

  return (
    <header>
        <div className="container">
            <Link to="/">
                <h1>Workout Buddy</h1>
            </Link>
            <nav>
              <div>
                <button onClick={handleLogout}>Logout</button>
              </div>
              <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            </nav>
        </div>
    </header>
  )
}

export default Navbar
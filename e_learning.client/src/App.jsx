import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';    
import ProtectedRoutes from './ProtectedRoutes';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Link } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Admin from './components/Admin';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'>
            <Route element={<ProtectedRoutes/>}>
                <Route path='/' element={<Home/>} />
                <Route path='/admin' element={<Admin/>} />
            </Route>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='*' element={
                <div>
                    <header>
                        <h1>Not Found</h1>
                    </header>
                    <p>
                        <a href='/'>Back to Home</a>
                    </p>
                </div>
            } />
        </Route>
    )
)

function App() {
    const isLogged = localStorage.getItem("user");
    const logout = async () => {
        const response = await fetch("/api/E_Learning/logout", {
            method: "GET", 
            credentials: "include"
        })

        const data = await response.json()
        if(response.ok){
            localStorage.removeItem("user")

            // alert(data.message);

            document.location = "/login"
        } else {
            console.log("could not logout: ", response)
        }
    }
    return (
        <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
  
                <Link className="navbar-brand" to={'/login'}>
                  E-Learning
                </Link>
              {
                isLogged ?
                    <span className='item-holder'>
                        <a href="/">Home</a>
                        <a href="/admin">Admin</a>
                        <span onClick={logout}>Logout</span>
                    </span> :
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to={'/login'}>
                          Login
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={'/register'}>
                          Register
                        </Link>
                      </li>
                    </ul>
                  </div>
                }
              </div>
    
            </nav>
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
    );
}

export default App;
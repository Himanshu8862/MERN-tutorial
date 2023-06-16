import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={ user ? <Home /> : <Navigate to="/login" /> }/>
          </Routes>
          <Routes>
            <Route path="/login" element={ !user ? <Login /> : <Navigate to="/" /> }/>
          </Routes>
          <Routes>
            <Route path="/register" element={ !user ? <Register /> : <Navigate to="/" /> }/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

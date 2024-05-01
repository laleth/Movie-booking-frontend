import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login';
import { useState } from 'react';
import Passwordreset from './components/Passwordreset';
import Landing from './components/Landing';
import MovieDetails from './components/MovieDetails';
import Addmovies from './components/Addmovies';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <div className="App">
      
    <Router>
        <Routes>
        <Route path="/" element={<Landing />}/>
          <Route
            path="/login"
            element={<Login setAuthenticated={setAuthenticated}/>}
          />
          <Route
            path="/home"
            element={authenticated ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/addmovies"
            element={authenticated ? <Addmovies/> : <Navigate to="/" />}
          />
           <Route path="/password-reset" element={<Passwordreset/>}/>
           <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>  
      </Router>
    </div>
  );
}

export default App;

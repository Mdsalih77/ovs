import './App.css';
import Dashboard from './Dashboard';
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Userdata from './Userdata';
import Login from './Login';
import Vote from './Vote';
import Viewresult from './Viewresult';
import Candidates from './Candidates';
import { Adminlogin } from './Adminlogin';
import ProtectedRoute from './Protectedroutes';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Userdata" element={<Userdata />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Viewresult" element={<Viewresult />} />
        <Route path="/Candidates" element={<Candidates />} />
        <Route path="/Adminlogin" element={<Adminlogin />} />
        <Route path="/vote" element={  <ProtectedRoute> <Vote /> </ProtectedRoute>}/>
      </Routes>
    </>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import PrivateRoute from './Hooks/PrivateRoute';
import Admin from './Components/Admin';

function App() {

 



  return (
    <div className="App">
       <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Login />} />
                <Route
                      path="/dashboard"
                      element={
                          <PrivateRoute allowedRoles={['user']}>
                              <Dashboard />
                          </PrivateRoute>
                      }
                  />
                  <Route
                      path="/admin"
                      element={
                          <PrivateRoute allowedRoles={['admin']}>
                              <Admin />
                          </PrivateRoute>
                      }
                  />

            </Routes>
        </Router>
    </div>
  );
}

export default App;

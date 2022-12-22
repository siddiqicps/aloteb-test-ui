import logo from './logo.svg';
import './App.css';
import React, { useEffect,  Fragment, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import RequireAuth from "components/RequireAuth";
import LoginPage from "pages/Login/LoginPage/LoginPage";
// const Login = lazy(() => import('./pages/Login/Login'));
import DashboardPage from "pages/Dashboard/DashboardPage/DashboardPage";
import Navbar from "components/Header/Navbar";
import UserPage from 'pages/User/UserPage';


function App() {
  return (
    <Router>
            <Routes>
              <Route exact path='/' element={<LoginPage/>} />
              <Route path="/sign-in" element={<LoginPage/>} />
              {/* <Route path="/logout" element={<LogoutWithRouter/>} /> */}
              {/* <Route path="/dashboard" component={Dashboard} /> */}
              <Route exact path="/dashboard" element={
                  // <!-- Begin page -->
                  <RequireAuth>
                  <div id="wrapper">
                    <Navbar />
                    <DashboardPage />
                  </div>
                  </RequireAuth>
              } 
              />
              <Route exact path="/users" element={
                  // <!-- Begin page -->
                  <RequireAuth>
                  <div id="wrapper">
                    <Navbar />
                    <UserPage />
                  </div>
                  </RequireAuth>
              } 
              />
            </Routes>
    </Router>
  );
}

export default App;

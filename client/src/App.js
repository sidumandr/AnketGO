import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/layout/Navbar';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SurveyPage from './pages/SurveyPage';
import MyAnswersPage from './pages/MyAnswersPage';
import UserListPage from './pages/admin/UserListPage';
import UserDetailPage from './pages/admin/UserDetailPage';
import SurveyManagerPage from './pages/admin/SurveyManagerPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-vh-100 d-flex flex-column">
          <Navbar />
          <main className="flex-grow-1 py-4">
            <div className="container">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                } />
                <Route path="/survey/:id" element={
                  <PrivateRoute>
                    <SurveyPage />
                  </PrivateRoute>
                } />
                <Route path="/my-answers" element={
                  <PrivateRoute>
                    <MyAnswersPage />
                  </PrivateRoute>
                } />
                <Route path="/admin/users" element={
                  <PrivateRoute adminOnly>
                    <UserListPage />
                  </PrivateRoute>
                } />
                <Route path="/admin/users/:id" element={
                  <PrivateRoute adminOnly>
                    <UserDetailPage />
                  </PrivateRoute>
                } />
                <Route path="/admin/surveys" element={
                  <PrivateRoute adminOnly>
                    <SurveyManagerPage />
                  </PrivateRoute>
                } />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </main>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}

export default App;

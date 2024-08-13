import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from '../components/dashboard-page';
import { MenuProvider } from '../menu-context';
import TopMenu from '../components/top-menu';
import SplashPage from '../components/splash-page';
import RegisterPage from '../components/register-page';
import LoginPage from '../components/login-page';
import PrivateRoute from '../components/private-route';
import VerifyEmailPage from '../components/verify-email-page';
import ChangePasswordPage from '../components/change-password-page';
import ForgotPasswordPage from '../components/forgot-password-page';

function App() {
  return (
    <div className="app-container">
      <MenuProvider>
        <TopMenu />
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route
            path="/change-password"
            element={
              <PrivateRoute>
                <ChangePasswordPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </MenuProvider>
    </div>
  );
}

export default App;

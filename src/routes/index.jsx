import { Fragment, lazy } from 'react';
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

// Landing route
const LandingPage = lazy(() => import('@/features/LandingPage'));

// Authentication Routes
const Login = lazy(() => import('@/features/auth/Login'));
const Signup = lazy(() => import('@/features/auth/SignupUser'));

// Super Admin routes
const Dashboard = lazy(() => import('@/features/admin/Dashboard'));

import ProtectedRoute from '@/utils/ProtectedRoute';
import ErrorBoundary from '@/utils/ErrorBoundary';

const routers = createBrowserRouter(
  createRoutesFromElements(
    <Fragment>
      <Route path="/" element={<Navigate to={'/home'} />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/auth">
        <Route index path="login" element={<Login />} />
        <Route
          path="register"
          element={<Signup />}
          errorElement={<ErrorBoundary />}
        />
      </Route>
      <Route path="*" element={<ErrorBoundary />} />

      <Route path="admin">
        <Route
          index
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Fragment>
  )
);

export default routers;

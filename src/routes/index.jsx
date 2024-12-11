import { Fragment, lazy } from 'react';
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { roles } from '@/utils/constants';

// Landing route
const LandingPage = lazy(() => import('@/features/LandingPage'));

// Authentication Routes
const Login = lazy(() => import('@/features/auth/Login'));
const Signup = lazy(() => import('@/features/auth/SignupUser'));

// Super Admin routes
const Dashboard = lazy(() => import('@/features/admin/Dashboard'));
const User = lazy(() => import('@/features/admin/User'));
const Task = lazy(() => import('@/features/admin/Task'));
const Settings = lazy(() => import('@/features/admin/Settings'));

// User routes
const UDashboard = lazy(() => import('@/features/user/Dashboard'));

import ProtectedRoute from '@/utils/ProtectedRoute';
import ErrorBoundary from '@/utils/ErrorBoundary';
import DashboardLayout from '@/layouts/DashboardLayout';

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

      <Route
        path="admin"
        element={
          <ProtectedRoute allowedRoles={[roles.SUPERADMIN]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user" element={<User />} />
        <Route path="task" element={<Task />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route
        path="user"
        element={
          <ProtectedRoute allowedRoles={[roles.USER]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<UDashboard />} />
      </Route>
    </Fragment>
  )
);

export default routers;

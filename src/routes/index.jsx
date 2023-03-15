import React, { Suspense } from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store';

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Login from '@/pages/auth/Login/Login';
import Spinner from '@/commons/Spinner/Spinner';

const AuthRoute = (props) => {
  let user = useSelector((state) => state.user.user);
  if (user?.role !== 'admin' && user?.role !== 'superadmin') {
    return <Navigate to="/" />;
  }
  return props.children;
};

const AuthSuperadminRoute = (props) => {
  let user = useSelector((state) => state.user.user);
  if (user.role !== 'superadmin') {
    return <Navigate to="/" />;
  }
  return props.children;
};

const ForgotPassword = React.lazy(() =>
  import('@/pages/auth/ForgotPassword/ForgotPassword')
);
const RecoveryPassword = React.lazy(() =>
  import('@/pages/auth/RecoveryPassword/RecoveryPassword')
);

const Dashboard = React.lazy(() => import('@/pages/Dashboard/Dashboard'));
const Profile = React.lazy(() => import('@/pages/Profile/Tabs'));
const Settings = React.lazy(() => import('@/pages/Settings/Settings'));
const Media = React.lazy(() => import('@/pages/Media/Media'));
const Sections = React.lazy(() => import('@/pages/Sections/Sections'));

function AppRoutes() {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/recovery-password" element={<RecoveryPassword />} />
              <Route
                path="/dashboard"
                element={
                  <AuthRoute>
                    <Dashboard />
                  </AuthRoute>
                }
              />
              <Route
                path="/perfil"
                element={
                  <AuthRoute>
                    <Profile />
                  </AuthRoute>
                }
              />
              <Route
                path="/media"
                element={
                  <AuthRoute>
                    <Media />
                  </AuthRoute>
                }
              />
              <Route
                path="/configuracion"
                element={
                  <AuthRoute>
                    <Settings />
                  </AuthRoute>
                }
              />

              <Route
                path="/secciones"
                element={
                  <AuthRoute>
                    <Sections />
                  </AuthRoute>
                }
              />
            </Routes>
          </Suspense>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default AppRoutes;

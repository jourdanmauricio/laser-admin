import React, { Suspense } from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import './Global.css';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Login from './pages/auth/Login/Login';

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
  import('./pages/auth/ForgotPassword/ForgotPassword')
);
const RecoveryPassword = React.lazy(() =>
  import('./pages/auth/RecoveryPassword/RecoveryPassword')
);

const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const Profile = React.lazy(() => import('./pages/Profile/Profile'));

function App() {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<div />}>
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
                path="/profile"
                element={
                  <AuthRoute>
                    <Profile />
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

export default App;

import ReactDOM from 'react-dom/client';
import NotificationProvider from './commons/Notifications/NotificationProvider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <App />
  </NotificationProvider>
);

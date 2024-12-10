import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store, persistor } from '@/app/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'aos/dist/aos.css';
import '@/index.css';
import App from '@/App';
import { ThemeProvider } from '@material-tailwind/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={'Loading...'}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ThemeProvider>
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_CLIENT_ID ?? ''}
            >
              <App />
            </GoogleOAuthProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </Suspense>
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      pauseOnHover={false}
      theme="light"
      limit={1}
    />
  </React.StrictMode>
);

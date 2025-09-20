import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store, persistor } from './store';
import './index.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { setupPerformanceMonitoring } from './config/performance';
import * as serviceWorker from './serviceWorker';

// Setup performance monitoring
setupPerformanceMonitoring();

const root = ReactDOM.createRoot(document.getElementById('root'));
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// Register service worker for offline support and caching only in production.
// During development we unregister to avoid stale cached bundles causing confusing runtime errors.
if (process.env.NODE_ENV === 'production') {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}

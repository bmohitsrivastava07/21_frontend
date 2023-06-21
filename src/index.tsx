import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import { BrowserRouter } from 'react-router-dom';
import {loadStripe} from'@stripe/stripe-js';
import {Elements} from'@stripe/react-stripe-js';

const stripePromise=loadStripe('pk_test_51NA9sdSJVgLExqPUcjjkOkEYkdi65QkfxG8wg2cdXR5J82GL5svGzy5lLpsBaXJ4kCFMJnt2c44fvu30VpB6lmsR00bCPyArjp');
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <Elements stripe={stripePromise}>
  <App />
  </Elements>
   
  </BrowserRouter>
);


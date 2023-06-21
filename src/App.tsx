
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Navbar } from './Layouts/NavbarAndFooter/Navbar';
import { Footer } from './Layouts/NavbarAndFooter/Footer';
import { SearchProductsPage } from './Layouts/SearchProductPage/SearchProductsPage';
import { HomePage } from './Layouts/HomePage/HomePage';
import { ProductCheckoutPage } from './Layouts/ProductCheckoutPage/ProductCheckoutPage';
import LoginWidget from './Auth/LoginWidget';
import { OktaConfig } from './Credentials/OktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback} from '@okta/okta-react';
import { ReviewListPage } from './Layouts/ProductCheckoutPage/ReviewListPage/ReviewListPage';
import { ShelfPage } from './Layouts/ShelfPage/ShelfPage';
import { MessagesPage } from './Layouts/MessagesPage/MessagesPage';
import { ManageArtPage } from './Layouts/ManageArtPage/ManageArtPage';
import { PaymentPage } from './Layouts/PaymentPage/PaymentPage';
import { ToastContainer } from 'react-toastify';
const oktaAuth = new OktaAuth(OktaConfig);
export const App = () => {
  const customAuthHandler = () => {
    navigate('/login');
  }
  const navigate = useNavigate();
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
        <Navbar />
        <div className='flex-grow-1'>
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/search' element={<SearchProductsPage />}></Route>
            <Route path='/reviewlist/:productId' element={<ReviewListPage />}></Route>
            <Route path='/checkout/:productId' element={<ProductCheckoutPage />}></Route>
            <Route path='/login' Component={() => <LoginWidget config={OktaConfig} />} />
            <Route path='/login/callback' Component={LoginCallback} />
            <Route path='/fees' element={<PaymentPage/>}/>
            <Route path="/shelf" element={<ShelfPage/>} />
            <Route path='/messages' element={<MessagesPage/>}/>
            <Route path='/admin' element={<ManageArtPage/>}/>
          </Routes>
        </div>
        <Footer />
      </Security>
      <ToastContainer/>
    </div>
  );
} 
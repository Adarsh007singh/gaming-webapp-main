import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { UserDetailsProvider } from './context/UserDetailsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <UserDetailsProvider>
    <App />
    </UserDetailsProvider>
    </CartProvider>
    </ProductProvider>
  </React.StrictMode>
);

reportWebVitals();

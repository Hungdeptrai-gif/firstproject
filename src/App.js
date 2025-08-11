import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Home from './components/Home';
import ProductCustomizer from './components/ProductCustomizer';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';
import Success from './components/Success';
import AdminDashboard from './components/AdminDashboard';
import { CartProvider } from './context/CartContext';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const MainContent = styled.main`
  padding-top: 80px;
`;

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContainer>
          <Header />
          <MainContent>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/customize" element={<ProductCustomizer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<OrderForm />} />
              <Route path="/success" element={<Success />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </MainContent>
        </AppContainer>
      </Router>
    </CartProvider>
  );
}

export default App;

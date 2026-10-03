import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import ModelView from './pages/ModelView';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import CookieBanner from './components/CookieBanner';
import { AuthProvider } from './context/AuthContext';
import { VehicleProvider } from './context/VehicleContext';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <VehicleProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/models/:id" element={<ModelView />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieBanner />
      </VehicleProvider>
    </AuthProvider>
  );
}

export default App;

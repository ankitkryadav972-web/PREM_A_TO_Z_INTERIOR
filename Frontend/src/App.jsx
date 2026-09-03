import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

import Navbar from './components/common/Navbar.jsx';
import Footer from './components/common/Footer.jsx';
import WhatsAppButton from './components/common/WhatsAppButton.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';

import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#0f0f11] text-[#e8e6e1] selection:bg-[#c5a880] selection:text-black">
          {/* Global Navigation */}
          <Navbar />

          {/* Main Content Viewport */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              {/* Catch-all fallback */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          {/* Floating WhatsApp Action Button */}
          <WhatsAppButton />

          {/* Global Footer */}
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/user/HomePage';
import ProductPage from './pages/user/ProductPage';
import LoginPage from './pages/user/LoginPage';

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Navbar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';
import Navbar from './components/Navbar.jsx';
import ToastContainer from './components/ToastContainer.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import AddProduct from './pages/AddProduct.jsx';
import EditProduct from './pages/EditProduct.jsx';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <ProductProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div className="app-wrapper">
            <Navbar />
            <ToastContainer />
            <main className="main-content">
              <Routes>
                <Route path="/"                    element={<Home />} />
                <Route path="/products"            element={<Products />} />
                <Route path="/products/:id"        element={<ProductDetail />} />
                <Route path="/products/add"        element={<AddProduct />} />
                <Route path="/products/edit/:id"   element={<EditProduct />} />
              </Routes>
            </main>
            {/* Footer rendered on all non-home pages */}
            <Routes>
              <Route path="/"             element={null} />
              <Route path="*"             element={<Footer />} />
            </Routes>
          </div>
        </Router>
      </ProductProvider>
    </ThemeProvider>
  );
}

export default App;

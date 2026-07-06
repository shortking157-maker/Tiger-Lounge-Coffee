import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/customer/Navbar'
import Home from './pages/customer/Home'
import Menu from './pages/customer/Menu'
import Cart from './pages/customer/Cart'
import Checkout from './pages/customer/Checkout'
import OrderTracking from './pages/customer/OrderTracking'
import './App.css'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-dark">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/tracking" element={<OrderTracking />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
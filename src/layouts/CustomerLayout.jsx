import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/customer/Home'
import Menu from '../pages/customer/Menu'
import Cart from '../pages/customer/Cart'
import OrderTracking from '../pages/customer/OrderTracking'
import Navbar from '../components/customer/Navbar'

function CustomerLayout() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/tracking" element={<OrderTracking />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default CustomerLayout
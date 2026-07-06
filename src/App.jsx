import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CustomerLayout from './layouts/CustomerLayout'
import AdminLayout from './layouts/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import ProtectedRoute from './components/ProtectedRoute'
import QRCodeValidator from './components/QRCodeValidator'

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)

  useEffect(() => {
    const adminToken = localStorage.getItem('admin_token')
    if (adminToken) {
      setIsAdminAuthenticated(true)
    }
  }, [])

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin setIsAdminAuthenticated={setIsAdminAuthenticated} />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
              <AdminLayout setIsAdminAuthenticated={setIsAdminAuthenticated} />
            </ProtectedRoute>
          }
        />

        {/* Customer Routes */}
        <Route
          path="/*"
          element={
            <QRCodeValidator>
              <CustomerLayout />
            </QRCodeValidator>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
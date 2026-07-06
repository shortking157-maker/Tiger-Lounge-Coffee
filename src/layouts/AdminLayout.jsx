import { Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from '../pages/admin/AdminDashboard'
import MenuManagement from '../pages/admin/MenuManagement'
import TableManagement from '../pages/admin/TableManagement'
import OrderHistory from '../pages/admin/OrderHistory'
import Statistics from '../pages/admin/Statistics'
import AdminNavbar from '../components/admin/AdminNavbar'

function AdminLayout({ setIsAdminAuthenticated }) {
  return (
    <div className="min-h-screen bg-dark">
      <AdminNavbar setIsAdminAuthenticated={setIsAdminAuthenticated} />
      <Routes>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/menu" element={<MenuManagement />} />
        <Route path="/tables" element={<TableManagement />} />
        <Route path="/history" element={<OrderHistory />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
    </div>
  )
}

export default AdminLayout
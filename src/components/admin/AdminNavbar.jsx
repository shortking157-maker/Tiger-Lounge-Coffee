import { useNavigate, useLocation } from 'react-router-dom'
import { Coffee, BarChart3, Menu, Users, History, LogOut } from 'lucide-react'

function AdminNavbar({ setIsAdminAuthenticated }) {
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setIsAdminAuthenticated(false)
    navigate('/admin/login')
  }

  return (
    <nav className="bg-dark-secondary border-b border-gold/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex justify-between items-center mb-4 md:mb-0">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-gold font-bold text-xl"
          >
            <Coffee className="w-6 h-6" />
            Tiger Admin
          </button>
        </div>

        <div className="hidden md:flex gap-6 flex-wrap">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className={`flex items-center gap-2 pb-2 transition ${
              isActive('/admin/dashboard') ? 'text-gold border-b-2 border-gold' : 'text-white-secondary hover:text-white-primary'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Tableau de Bord
          </button>
          <button
            onClick={() => navigate('/admin/menu')}
            className={`flex items-center gap-2 pb-2 transition ${
              isActive('/admin/menu') ? 'text-gold border-b-2 border-gold' : 'text-white-secondary hover:text-white-primary'
            }`}
          >
            <Menu className="w-4 h-4" />
            Menu
          </button>
          <button
            onClick={() => navigate('/admin/tables')}
            className={`flex items-center gap-2 pb-2 transition ${
              isActive('/admin/tables') ? 'text-gold border-b-2 border-gold' : 'text-white-secondary hover:text-white-primary'
            }`}
          >
            <Users className="w-4 h-4" />
            Tables
          </button>
          <button
            onClick={() => navigate('/admin/history')}
            className={`flex items-center gap-2 pb-2 transition ${
              isActive('/admin/history') ? 'text-gold border-b-2 border-gold' : 'text-white-secondary hover:text-white-primary'
            }`}
          >
            <History className="w-4 h-4" />
            Historique
          </button>
          <button
            onClick={() => navigate('/admin/statistics')}
            className={`flex items-center gap-2 pb-2 transition ${
              isActive('/admin/statistics') ? 'text-gold border-b-2 border-gold' : 'text-white-secondary hover:text-white-primary'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Statistiques
          </button>
          <button
            onClick={handleLogout}
            className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition border border-red-500/30"
          >
            <LogOut className="w-4 h-4" />
            Deconnexion
          </button>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar
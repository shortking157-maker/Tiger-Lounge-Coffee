import { useNavigate, useLocation } from 'react-router-dom'
import { Coffee, Menu, ShoppingCart, Truck } from 'lucide-react'
import { useCart } from '../../context/CartContext'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { cartItems } = useCart()
  const isActive = (path) => location.pathname === path

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="bg-dark-secondary border-b border-gold/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gold font-bold text-xl hover:text-gold-light transition"
          >
            <Coffee className="w-6 h-6" />
            Tiger Lounge
          </button>

          <div className="hidden md:flex gap-8">
            <button
              onClick={() => navigate('/')}
              className={`flex items-center gap-2 pb-2 transition ${
                isActive('/') ? 'text-gold border-b-2 border-gold' : 'text-white-secondary hover:text-white-primary'
              }`}
            >
              Accueil
            </button>
            <button
              onClick={() => navigate('/menu')}
              className={`flex items-center gap-2 pb-2 transition ${
                isActive('/menu') ? 'text-gold border-b-2 border-gold' : 'text-white-secondary hover:text-white-primary'
              }`}
            >
              <Menu className="w-4 h-4" />
              Menu
            </button>
            <button
              onClick={() => navigate('/tracking')}
              className={`flex items-center gap-2 pb-2 transition ${
                isActive('/tracking') ? 'text-gold border-b-2 border-gold' : 'text-white-secondary hover:text-white-primary'
              }`}
            >
              <Truck className="w-4 h-4" />
              Suivi
            </button>
          </div>

          <button
            onClick={() => navigate('/cart')}
            className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/20 text-gold hover:bg-gold/30 transition border border-gold/30"
          >
            <ShoppingCart className="w-5 h-5" />
            Panier
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
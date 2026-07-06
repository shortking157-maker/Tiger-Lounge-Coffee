import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Trash2, Minus, Plus } from 'lucide-react'
import { useCart } from '../../context/CartContext'

function Cart() {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <p className="text-white-secondary text-xl mb-8">Votre panier est vide</p>
          <button
            onClick={() => navigate('/menu')}
            className="px-8 py-3 bg-gold text-dark font-bold rounded-lg hover:bg-gold-light transition"
          >
            Continuer les courses
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white-primary mb-8">Panier</h1>

        <div className="space-y-4 mb-8">
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-lg p-6 border border-gold/20 flex justify-between items-center"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gold">{item.name}</h3>
                <p className="text-white-secondary text-sm">{item.price} DZD</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-dark-card rounded-lg p-2 border border-gold/20">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 hover:text-gold transition"
                  >
                    <Minus className="w-4 h-4 text-white-primary" />
                  </button>
                  <span className="text-white-primary font-semibold w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:text-gold transition"
                  >
                    <Plus className="w-4 h-4 text-white-primary" />
                  </button>
                </div>
                <p className="text-gold font-bold min-w-24 text-right">{(item.price * item.quantity).toFixed(2)} DZD</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 hover:bg-red-500/20 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5 text-red-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="glass rounded-lg p-6 border border-gold/30 mb-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-white-secondary text-lg">Total</p>
            <p className="text-4xl font-bold text-gold">{total.toFixed(2)} DZD</p>
          </div>
          <button
            onClick={() => {
              navigate('/checkout')
            }}
            className="w-full py-4 bg-gold text-dark font-bold text-lg rounded-lg hover:bg-gold-light transition"
          >
            Passer la commande
          </button>
        </div>

        <button
          onClick={() => navigate('/menu')}
          className="w-full py-3 bg-dark-card text-white-primary font-semibold rounded-lg hover:bg-dark-secondary transition border border-gold/20"
        >
          Continuer les courses
        </button>
      </div>
    </div>
  )
}

export default Cart
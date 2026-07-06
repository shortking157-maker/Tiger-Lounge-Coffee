import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../config/supabase'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { useCart } from '../../context/CartContext'

function Checkout() {
  const navigate = useNavigate()
  const { cartItems, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    table_number: '',
    customer_name: '',
    customer_phone: ''
  })

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!formData.table_number || !formData.customer_name || !formData.customer_phone) {
        throw new Error('Tous les champs sont requis')
      }

      if (cartItems.length === 0) {
        throw new Error('Votre panier est vide')
      }

      const orderNumber = `ORD-${Date.now()}`
      const orderTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      const today = new Date().toISOString().split('T')[0]

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            order_number: orderNumber,
            table_number: parseInt(formData.table_number),
            table_id: parseInt(formData.table_number),
            customer_name: formData.customer_name,
            customer_phone: formData.customer_phone,
            total_price: total,
            order_time: orderTime,
            status: 'En preparation',
            date: today
          }
        ])
        .select()

      if (orderError) throw orderError

      const orderId = orderData[0].id

      const orderItems = cartItems.map((item) => ({
        order_id: orderId,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }))

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems)

      if (itemsError) throw itemsError

      setSuccess(true)
      clearCart()

      setTimeout(() => {
        const token = Math.random().toString(36).substr(2, 9)
        navigate(`/tracking?token=${token}&table=${formData.table_number}`)
      }, 2000)
    } catch (err) {
      console.error('Error creating order:', err)
      setError(err.message || 'Erreur lors de la creation de la commande')
    } finally {
      setIsLoading(false)
    }
  }

  if (cartItems.length === 0 && !success) {
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

  if (success) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <p className="text-white-primary text-2xl font-bold mb-2">Commande confirmee!</p>
          <p className="text-white-secondary mb-8">Redirection vers le suivi...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto"></div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white-primary mb-8">Finaliser la Commande</h1>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-lg p-4 border border-red-500/30 bg-red-500/10 mb-6 flex gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-400">{error}</p>
          </motion.div>
        )}

        <div className="glass rounded-lg p-6 border border-gold/30 mb-8">
          <h2 className="text-xl font-bold text-gold mb-6">Resume de la Commande</h2>
          <div className="space-y-3 mb-6 pb-6 border-b border-gold/20">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-white-primary">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span className="text-gold">{(item.price * item.quantity).toFixed(2)} DZD</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-white-secondary">Total</p>
            <p className="text-3xl font-bold text-gold">{total.toFixed(2)} DZD</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-lg p-6 border border-gold/30 space-y-6">
          <div>
            <label className="block text-white-primary font-semibold mb-2">Numero de Table</label>
            <input
              type="number"
              name="table_number"
              value={formData.table_number}
              onChange={handleChange}
              placeholder="Ex: 5"
              required
              className="w-full px-4 py-3 bg-dark-card rounded-lg border border-gold/20 text-white-primary placeholder-white-secondary/50 focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-white-primary font-semibold mb-2">Nom</label>
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              placeholder="Votre nom"
              required
              className="w-full px-4 py-3 bg-dark-card rounded-lg border border-gold/20 text-white-primary placeholder-white-secondary/50 focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-white-primary font-semibold mb-2">Telephone</label>
            <input
              type="tel"
              name="customer_phone"
              value={formData.customer_phone}
              onChange={handleChange}
              placeholder="Votre numero"
              required
              className="w-full px-4 py-3 bg-dark-card rounded-lg border border-gold/20 text-white-primary placeholder-white-secondary/50 focus:outline-none focus:border-gold"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gold text-dark font-bold text-lg rounded-lg hover:bg-gold-light transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Traitement...' : 'Confirmer la Commande'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Checkout
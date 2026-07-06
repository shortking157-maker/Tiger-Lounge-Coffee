import { useState } from 'react'
import { supabase } from '../../config/supabase'
import { motion } from 'framer-motion'
import { Clock, CheckCircle } from 'lucide-react'

function OrderCard({ order, onStatusChange }) {
  const [isUpdating, setIsUpdating] = useState(false)

  const updateStatus = async (newStatus) => {
    setIsUpdating(true)
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', order.id)

      if (error) throw error
      onStatusChange()
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass rounded-lg p-6 border border-gold/20 hover:border-gold/50 transition"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div>
          <p className="text-white-secondary text-sm">N° Commande</p>
          <p className="text-white-primary font-bold text-lg">{order.order_number}</p>
        </div>
        <div>
          <p className="text-white-secondary text-sm">Table</p>
          <p className="text-gold font-bold text-lg">Table {order.table_number}</p>
        </div>
        <div>
          <p className="text-white-secondary text-sm">Heure</p>
          <p className="text-white-primary font-semibold">{order.order_time}</p>
        </div>
        <div>
          <p className="text-white-secondary text-sm">Total</p>
          <p className="text-gold font-bold text-lg">{order.total_price} DZD</p>
        </div>
        <div>
          <p className="text-white-secondary text-sm">Statut</p>
          <div className="flex items-center gap-2 mt-1">
            {order.status === 'En preparation' && <Clock className="w-4 h-4 text-blue-400" />}
            {order.status === 'Servie' && <CheckCircle className="w-4 h-4 text-green-400" />}
            <p className={`font-semibold ${
              order.status === 'En preparation' ? 'text-blue-400' : 'text-green-400'
            }`}>
              {order.status}
            </p>
          </div>
        </div>
      </div>

      {order.customer_comment && (
        <div className="mb-4 pb-4 border-b border-gold/20">
          <p className="text-white-secondary text-sm mb-1">Commentaire client</p>
          <p className="text-white-primary italic">{order.customer_comment}</p>
        </div>
      )}

      <div className="flex gap-2">
        {order.status === 'En preparation' && (
          <button
            onClick={() => updateStatus('Servie')}
            disabled={isUpdating}
            className="flex-1 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? 'Mise a jour...' : 'Marquer comme Servie'}
          </button>
        )}
        {order.status === 'Servie' && (
          <div className="flex-1 px-4 py-2 bg-green-500/20 text-green-400 font-semibold rounded-lg border border-green-500 text-center">
            Commande servie
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default OrderCard
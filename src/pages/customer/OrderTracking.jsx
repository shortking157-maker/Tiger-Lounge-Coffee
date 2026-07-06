import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../../config/supabase'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, AlertCircle } from 'lucide-react'

function OrderTracking() {
  const [searchParams] = useSearchParams()
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const orderToken = searchParams.get('token')
  const tableId = searchParams.get('table')

  useEffect(() => {
    if (orderToken && tableId) {
      fetchOrder()
      const subscription = supabase
        .channel(`order_${tableId}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
          fetchOrder()
        })
        .subscribe()

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [orderToken, tableId])

  const fetchOrder = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const { data, error: queryError } = await supabase
        .from('orders')
        .select('*')
        .eq('table_id', tableId)
        .eq('date', today)
        .order('created_at', { ascending: false })
        .limit(1)

      if (queryError) throw queryError

      if (data && data.length > 0) {
        setOrder(data[0])
        setError('')
      } else {
        setError('Commande non trouvee')
      }
    } catch (err) {
      console.error('Error fetching order:', err)
      setError('Erreur lors de la recuperation de la commande')
    } finally {
      setIsLoading(false)
    }
  }

  if (!orderToken || !tableId) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-white-secondary text-lg">Lien invalide ou expire</p>
        </motion.div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-white-secondary text-lg">{error}</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white-primary text-center mb-12">Suivi de Commande</h1>

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="glass rounded-lg p-8 border border-gold/30">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-white-secondary text-sm mb-1">N Commande</p>
                  <p className="text-2xl font-bold text-gold">{order.order_number}</p>
                </div>
                <div>
                  <p className="text-white-secondary text-sm mb-1">Table</p>
                  <p className="text-2xl font-bold text-white-primary">{order.table_number}</p>
                </div>
                <div>
                  <p className="text-white-secondary text-sm mb-1">Heure</p>
                  <p className="text-lg text-white-primary font-semibold">{order.order_time}</p>
                </div>
                <div>
                  <p className="text-white-secondary text-sm mb-1">Total</p>
                  <p className="text-2xl font-bold text-gold">{order.total_price} DZD</p>
                </div>
              </div>

              <div className="bg-dark rounded-lg p-6 border border-gold/20">
                <h3 className="text-white-primary font-bold mb-4">Status de votre commande</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {order.status === 'En preparation' ? (
                      <Clock className="w-8 h-8 text-blue-400 animate-spin" />
                    ) : (
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    )}
                    <div>
                      <p className="text-white-secondary text-sm">Status</p>
                      <p className={`font-bold ${
                        order.status === 'En preparation' ? 'text-blue-400' : 'text-green-400'
                      }`}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default OrderTracking
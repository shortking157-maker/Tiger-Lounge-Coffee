import { useState, useEffect } from 'react'
import { supabase } from '../../config/supabase'
import { motion } from 'framer-motion'
import { Calendar, Search } from 'lucide-react'

function OrderHistory() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchOrders()
  }, [selectedDate])

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('date', selectedDate)
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredOrders = orders.filter((order) =>
    order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.table_number.toString().includes(searchQuery)
  )

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + (order.total_price || 0), 0)

  return (
    <div className="min-h-screen bg-dark p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white-primary mb-8">Historique des Commandes</h1>

        <div className="glass rounded-lg p-6 border border-gold/30 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-white-primary text-sm font-medium mb-2">
                <Calendar className="inline w-4 h-4 mr-2" />
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 bg-dark-card rounded-lg border border-gold/20 text-white-primary focus:outline-none focus:border-gold"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-white-primary text-sm font-medium mb-2">
                <Search className="inline w-4 h-4 mr-2" />
                Rechercher
              </label>
              <input
                type="text"
                placeholder="Numero de commande ou table"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-dark-card rounded-lg border border-gold/20 text-white-primary placeholder-white-secondary/50 focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-white-secondary text-sm">Total des commandes</p>
              <p className="text-3xl font-bold text-gold">{filteredOrders.length}</p>
            </div>
            <div>
              <p className="text-white-secondary text-sm">Chiffre d'affaires</p>
              <p className="text-3xl font-bold text-gold">{totalRevenue.toFixed(2)} DZD</p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass rounded-lg p-6 border border-gold/20 hover:border-gold/50 transition"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-white-secondary text-sm">N Commande</p>
                      <p className="text-white-primary font-semibold">{order.order_number}</p>
                    </div>
                    <div>
                      <p className="text-white-secondary text-sm">Table</p>
                      <p className="text-white-primary font-semibold">{order.table_number}</p>
                    </div>
                    <div>
                      <p className="text-white-secondary text-sm">Heure</p>
                      <p className="text-white-primary font-semibold">{order.order_time}</p>
                    </div>
                    <div>
                      <p className="text-white-secondary text-sm">Total</p>
                      <p className="text-gold font-bold">{order.total_price} DZD</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="glass rounded-lg p-8 text-center border border-gold/30">
                <p className="text-white-secondary">Aucune commande trouvee</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderHistory
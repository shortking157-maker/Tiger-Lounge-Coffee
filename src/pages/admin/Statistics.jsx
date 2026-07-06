import { useState, useEffect } from 'react'
import { supabase } from '../../config/supabase'
import { motion } from 'framer-motion'
import { TrendingUp, Package, CheckCircle, Zap } from 'lucide-react'

function Statistics() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    ordersInPreparation: 0,
    ordersServed: 0,
    totalOrders: 0,
    activeTables: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStatistics()
    const subscription = supabase
      .channel('statistics')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchStatistics()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchStatistics = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]

      const [ordersRes, tablesRes] = await Promise.all([
        supabase
          .from('orders')
          .select('*')
          .eq('date', today),
        supabase
          .from('tables')
          .select('id')
      ])

      if (ordersRes.error) throw ordersRes.error
      if (tablesRes.error) throw tablesRes.error

      const orders = ordersRes.data || []
      const tables = tablesRes.data || []

      const totalRevenue = orders.reduce((sum, order) => sum + (order.total_price || 0), 0)
      const ordersInPreparation = orders.filter((order) => order.status === 'En preparation').length
      const ordersServed = orders.filter((order) => order.status === 'Servie').length

      setStats({
        totalRevenue,
        ordersInPreparation,
        ordersServed,
        totalOrders: orders.length,
        activeTables: tables.length
      })
    } catch (error) {
      console.error('Error fetching statistics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const StatCard = ({ icon: Icon, label, value }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-lg p-6 border border-gold/30 hover:border-gold/50 transition"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white-secondary text-sm mb-2">{label}</p>
          <p className="text-3xl font-bold text-gold">{value}</p>
        </div>
        <Icon className="w-12 h-12 text-gold" />
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-dark p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white-primary mb-8">Statistiques</h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <StatCard icon={TrendingUp} label="Chiffre d'affaires" value={`${stats.totalRevenue.toFixed(2)} DZD`} />
            <StatCard icon={Package} label="En preparation" value={stats.ordersInPreparation} />
            <StatCard icon={CheckCircle} label="Servies" value={stats.ordersServed} />
            <StatCard icon={Zap} label="Total commandes" value={stats.totalOrders} />
            <StatCard icon={Zap} label="Tables actives" value={stats.activeTables} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Statistics
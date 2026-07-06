import { useState, useEffect } from 'react'
import { supabase } from '../../config/supabase'
import { motion } from 'framer-motion'
import { Plus, Trash2, Download, RefreshCw } from 'lucide-react'
import QRCode from 'qrcode.react'

function TableManagement() {
  const [tables, setTables] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [tableNumber, setTableNumber] = useState('')
  const [selectedTableForQR, setSelectedTableForQR] = useState(null)

  useEffect(() => {
    fetchTables()
  }, [])

  const fetchTables = async () => {
    try {
      const { data, error } = await supabase
        .from('tables')
        .select('*, qr_tokens(*)')
        .order('table_number')

      if (error) throw error
      setTables(data || [])
    } catch (error) {
      console.error('Error fetching tables:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateToken = () => {
    return `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const handleAddTable = async (e) => {
    e.preventDefault()
    try {
      const token = generateToken()
      const { data: table, error: tableError } = await supabase
        .from('tables')
        .insert([{ table_number: parseInt(tableNumber) }])
        .select()

      if (tableError) throw tableError

      const { error: tokenError } = await supabase
        .from('qr_tokens')
        .insert([{
          table_id: table[0].id,
          token: token,
          is_active: true
        }])

      if (tokenError) throw tokenError

      fetchTables()
      setTableNumber('')
      setShowAddForm(false)
    } catch (error) {
      console.error('Error adding table:', error)
    }
  }

  const handleDeleteTable = async (tableId) => {
    if (confirm('Etes-vous sur de vouloir supprimer cette table?')) {
      try {
        const { error } = await supabase
          .from('tables')
          .delete()
          .eq('id', tableId)

        if (error) throw error
        fetchTables()
      } catch (error) {
        console.error('Error deleting table:', error)
      }
    }
  }

  const handleRegenerateToken = async (tableId) => {
    try {
      const token = generateToken()
      const { error } = await supabase
        .from('qr_tokens')
        .update({ token: token })
        .eq('table_id', tableId)

      if (error) throw error
      fetchTables()
    } catch (error) {
      console.error('Error regenerating token:', error)
    }
  }

  const downloadQRCode = (tableId, tableNumber) => {
    const element = document.getElementById(`qr-${tableId}`)
    if (element) {
      const canvas = element.querySelector('canvas')
      const url = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `table-${tableNumber}-qr.png`
      link.href = url
      link.click()
    }
  }

  return (
    <div className="min-h-screen bg-dark p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white-primary">Gestion des Tables</h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-gold text-dark px-6 py-2 rounded-lg hover:bg-gold-light transition font-semibold"
          >
            <Plus className="w-5 h-5" />
            Ajouter Table
          </button>
        </div>

        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-lg p-6 mb-8 border border-gold/30"
          >
            <form onSubmit={handleAddTable}>
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Numero de table"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="flex-1 px-4 py-2 bg-dark-card rounded-lg border border-gold/20 text-white-primary placeholder-white-secondary/50 focus:outline-none focus:border-gold"
                  required
                />
                <button
                  type="submit"
                  className="bg-gold text-dark px-6 py-2 rounded-lg hover:bg-gold-light transition font-semibold"
                >
                  Creer
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-dark-card text-white-primary px-6 py-2 rounded-lg hover:bg-dark-secondary transition border border-gold/20"
                >
                  Annuler
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tables.map((table) => (
              <motion.div
                key={table.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-lg p-6 border border-gold/20 hover:border-gold/50 transition"
              >
                <h3 className="text-2xl font-bold text-gold mb-4">Table {table.table_number}</h3>

                {table.qr_tokens && table.qr_tokens.length > 0 && (
                  <div className="mb-4 p-4 bg-white/10 rounded-lg flex justify-center">
                    <div id={`qr-${table.id}`}>
                      <QRCode
                        value={`${window.location.origin}?token=${table.qr_tokens[0].token}&table=${table.id}`}
                        size={150}
                        level="H"
                        includeMargin={true}
                        fgColor="#d4af37"
                        bgColor="#0a0a0a"
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => downloadQRCode(table.id, table.table_number)}
                    className="flex items-center justify-center gap-2 bg-gold/20 text-gold px-3 py-2 rounded-lg hover:bg-gold/30 transition border border-gold/30 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Telecharger QR
                  </button>
                  <button
                    onClick={() => handleRegenerateToken(table.id)}
                    className="flex items-center justify-center gap-2 bg-blue-500/20 text-blue-400 px-3 py-2 rounded-lg hover:bg-blue-500/30 transition border border-blue-500/30 text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerer Token
                  </button>
                  <button
                    onClick={() => handleDeleteTable(table.id)}
                    className="flex items-center justify-center gap-2 bg-red-500/20 text-red-400 px-3 py-2 rounded-lg hover:bg-red-500/30 transition border border-red-500/30 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TableManagement
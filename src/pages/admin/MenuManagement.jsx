import { useState, useEffect } from 'react'
import { supabase } from '../../config/supabase'
import { motion } from 'framer-motion'
import { Plus, Trash2, Edit2 } from 'lucide-react'

function MenuManagement() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    is_active: true
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        supabase.from('products').select('*').order('name'),
        supabase.from('categories').select('*')
      ])

      if (productsRes.error) throw productsRes.error
      if (categoriesRes.error) throw categoriesRes.error

      setProducts(productsRes.data || [])
      setCategories(categoriesRes.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(formData)
          .eq('id', editingProduct.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('products')
          .insert([formData])

        if (error) throw error
      }

      fetchData()
      setShowForm(false)
      setEditingProduct(null)
      setFormData({ name: '', description: '', price: '', category_id: '', is_active: true })
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const handleDelete = async (productId) => {
    if (confirm('Etes-vous sur de vouloir supprimer ce produit?')) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', productId)

        if (error) throw error
        fetchData()
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const startEdit = (product) => {
    setEditingProduct(product)
    setFormData(product)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-dark p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white-primary">Gestion du Menu</h1>
          <button
            onClick={() => {
              setEditingProduct(null)
              setFormData({ name: '', description: '', price: '', category_id: '', is_active: true })
              setShowForm(!showForm)
            }}
            className="flex items-center gap-2 bg-gold text-dark px-6 py-2 rounded-lg hover:bg-gold-light transition font-semibold"
          >
            <Plus className="w-5 h-5" />
            Ajouter Produit
          </button>
        </div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-lg p-6 mb-8 border border-gold/30"
          >
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Nom du produit"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-2 bg-dark-card rounded-lg border border-gold/20 text-white-primary placeholder-white-secondary/50 focus:outline-none focus:border-gold"
                  required
                />
                <input
                  type="number"
                  placeholder="Prix (DZD)"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="px-4 py-2 bg-dark-card rounded-lg border border-gold/20 text-white-primary placeholder-white-secondary/50 focus:outline-none focus:border-gold"
                  required
                />
              </div>
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-dark-card rounded-lg border border-gold/20 text-white-primary placeholder-white-secondary/50 focus:outline-none focus:border-gold mb-4"
              />
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-4 py-2 bg-dark-card rounded-lg border border-gold/20 text-white-primary focus:outline-none focus:border-gold mb-4"
                required
              >
                <option value="">Selectionner une categorie</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gold text-dark py-2 rounded-lg hover:bg-gold-light transition font-semibold"
                >
                  {editingProduct ? 'Mettre a jour' : 'Creer'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-dark-card text-white-primary py-2 rounded-lg hover:bg-dark-secondary transition border border-gold/20"
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
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-lg p-6 border border-gold/20 hover:border-gold/50 transition"
              >
                <h3 className="text-xl font-bold text-gold mb-2">{product.name}</h3>
                <p className="text-white-secondary text-sm mb-3">{product.description}</p>
                <p className="text-white-primary font-semibold mb-4">{product.price} DZD</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(product)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gold/20 text-gold px-3 py-2 rounded-lg hover:bg-gold/30 transition border border-gold/30"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editer
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500/20 text-red-400 px-3 py-2 rounded-lg hover:bg-red-500/30 transition border border-red-500/30"
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

export default MenuManagement
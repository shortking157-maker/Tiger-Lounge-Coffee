import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'

function AdminLogin({ setIsAdminAuthenticated }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (password === 'Tiger@2026') {
      localStorage.setItem('admin_token', 'authenticated')
      setIsAdminAuthenticated(true)
      navigate('/admin/dashboard')
    } else {
      setError('Mot de passe incorrect')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-2xl p-8 border border-gold/30">
          <div className="text-center mb-8">
            <Lock className="w-12 h-12 text-gold mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white-primary">Admin</h1>
            <p className="text-white-secondary mt-2">Tiger Lounge Coffee</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-white-primary text-sm font-medium mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-dark-card rounded-lg border border-gold/20 text-white-primary placeholder-white-secondary/50 focus:outline-none focus:border-gold transition"
                placeholder="Entrez le mot de passe"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-light transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminLogin
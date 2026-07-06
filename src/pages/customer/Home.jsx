import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Coffee, Clock, Users, Award } from 'lucide-react'

function Home() {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-dark">
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 max-w-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <Coffee className="w-24 h-24 text-gold mx-auto" />
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-bold text-white-primary mb-4">
            Tiger Lounge
          </h1>
          <p className="text-2xl md:text-3xl text-gold mb-8">Coffee</p>
          <p className="text-xl text-white-secondary mb-12 leading-relaxed">
            Bienvenue dans l'univers du cafe premium. Decouvrez une experience unique de saveurs rafinees et d'ambiance chaleureuse.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/menu')}
            className="px-8 py-4 bg-gold text-dark font-bold text-lg rounded-lg hover:bg-gold-light transition inline-block"
          >
            Commander Maintenant
          </motion.button>
        </motion.div>
      </section>

      <section className="py-20 px-4 bg-dark-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white-primary text-center mb-16">Pourquoi nous choisir?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Coffee, title: 'Cafe Premium', desc: 'Grains selectionnes avec soin' },
              { icon: Clock, title: 'Service Rapide', desc: 'Preparation en quelques minutes' },
              { icon: Users, title: 'Ambiance', desc: 'Espace convivial et detente' },
              { icon: Award, title: 'Qualite', desc: 'Excellence reconnue' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-lg p-8 border border-gold/30 text-center hover:border-gold/50 transition"
              >
                <item.icon className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white-primary mb-2">{item.title}</h3>
                <p className="text-white-secondary">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white-primary mb-8">Pret a Savourer?</h2>
          <p className="text-xl text-white-secondary mb-12">Consultez notre menu et passez votre commande directement via notre application</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/menu')}
            className="px-8 py-4 bg-gold text-dark font-bold text-lg rounded-lg hover:bg-gold-light transition"
          >
            Voir le Menu
          </motion.button>
        </div>
      </section>
    </div>
  )
}

export default Home
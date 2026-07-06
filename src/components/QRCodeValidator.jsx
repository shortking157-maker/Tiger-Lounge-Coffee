import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../config/supabase'

function QRCodeValidator({ children }) {
  const [isValidated, setIsValidated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const validateToken = async () => {
      try {
        const params = new URLSearchParams(location.search)
        const token = params.get('token')
        const tableId = params.get('table')

        if (!token || !tableId) {
          setIsValidated(false)
          setIsLoading(false)
          return
        }

        // Validate token with Supabase
        const { data, error } = await supabase
          .from('qr_tokens')
          .select('*')
          .eq('token', token)
          .eq('table_id', tableId)
          .eq('is_active', true)
          .single()

        if (error || !data) {
          setIsValidated(false)
        } else {
          // Store in session storage
          sessionStorage.setItem('qr_token', token)
          sessionStorage.setItem('table_id', tableId)
          setIsValidated(true)
        }
      } catch (error) {
        console.error('Token validation error:', error)
        setIsValidated(false)
      } finally {
        setIsLoading(false)
      }
    }

    validateToken()
  }, [location])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-white-secondary">Validation en cours...</p>
        </div>
      </div>
    )
  }

  if (!isValidated) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gold mb-4">⚠️</p>
          <p className="text-white-primary text-xl mb-2">Accès refusé</p>
          <p className="text-white-secondary">Veuillez scanner le QR code de votre table.</p>
        </div>
      </div>
    )
  }

  return children
}

export default QRCodeValidator
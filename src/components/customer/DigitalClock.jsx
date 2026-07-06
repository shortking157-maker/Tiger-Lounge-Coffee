import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, Clock } from 'lucide-react'

function DigitalClock() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedTimezones, setSelectedTimezones] = useState([
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney'
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date, timezone) => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: timezone
    })
    return formatter.format(date)
  }

  const getTimezoneCity = (timezone) => {
    const cityMap = {
      'America/New_York': 'New York',
      'America/Chicago': 'Chicago',
      'America/Denver': 'Denver',
      'America/Los_Angeles': 'Los Angeles',
      'Europe/London': 'London',
      'Europe/Paris': 'Paris',
      'Europe/Berlin': 'Berlin',
      'Asia/Tokyo': 'Tokyo',
      'Asia/Shanghai': 'Shanghai',
      'Asia/Hong_Kong': 'Hong Kong',
      'Asia/Singapore': 'Singapore',
      'Asia/Dubai': 'Dubai',
      'Australia/Sydney': 'Sydney',
      'Australia/Melbourne': 'Melbourne',
      'Pacific/Auckland': 'Auckland'
    }
    return cityMap[timezone] || timezone
  }

  const allTimezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Asia/Hong_Kong',
    'Asia/Singapore',
    'Asia/Dubai',
    'Australia/Sydney',
    'Australia/Melbourne',
    'Pacific/Auckland'
  ]

  const toggleTimezone = (timezone) => {
    setSelectedTimezones((prev) => {
      if (prev.includes(timezone)) {
        return prev.filter((tz) => tz !== timezone)
      } else {
        return [...prev, timezone]
      }
    })
  }

  return (
    <div className="min-h-screen bg-dark p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-gold" />
            <h1 className="text-4xl md:text-5xl font-bold text-white-primary">Global Time</h1>
            <Globe className="w-8 h-8 text-gold" />
          </div>
          <p className="text-white-secondary text-lg">View current time across different time zones</p>
        </motion.div>

        {/* Main Clock Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-8 border border-gold/30 mb-12"
        >
          <h2 className="text-2xl font-bold text-gold mb-6 text-center">Your Time</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center p-6 bg-dark-card rounded-lg border border-gold/20">
              <p className="text-white-secondary text-sm mb-2">Local Time</p>
              <p className="text-5xl font-bold text-gold font-mono">
                {currentTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true
                })}
              </p>
              <p className="text-white-secondary text-sm mt-2">
                {currentTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-dark-card rounded-lg border border-gold/20">
              <p className="text-white-secondary text-sm mb-2">UTC Time</p>
              <p className="text-5xl font-bold text-gold font-mono">
                {currentTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                  timeZone: 'UTC'
                })}
              </p>
              <p className="text-white-secondary text-sm mt-2">Coordinated Universal Time</p>
            </div>
          </div>
        </motion.div>

        {/* Timezone Selection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-8 border border-gold/30 mb-12"
        >
          <h2 className="text-2xl font-bold text-gold mb-6">Select Time Zones</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {allTimezones.map((timezone) => (
              <button
                key={timezone}
                onClick={() => toggleTimezone(timezone)}
                className={`px-4 py-2 rounded-lg transition font-semibold text-sm ${
                  selectedTimezones.includes(timezone)
                    ? 'bg-gold text-dark border border-gold'
                    : 'bg-dark-card text-white-primary border border-gold/20 hover:border-gold'
                }`}
              >
                {getTimezoneCity(timezone)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Timezone Clocks */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gold mb-6">World Clocks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedTimezones.length > 0 ? (
              selectedTimezones.map((timezone, index) => (
                <motion.div
                  key={timezone}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-6 border border-gold/30 hover:border-gold/50 transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gold">{getTimezoneCity(timezone)}</h3>
                      <p className="text-white-secondary text-xs">{timezone}</p>
                    </div>
                    <button
                      onClick={() => toggleTimezone(timezone)}
                      className="text-white-secondary hover:text-red-400 transition"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="bg-dark-card rounded-lg p-4 border border-gold/20 mb-3">
                    <p className="text-4xl font-bold text-gold font-mono text-center">
                      {formatTime(currentTime, timezone)}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="text-white-secondary">
                      📅 {new Date(currentTime.toLocaleString('en-US', { timeZone: timezone })).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-white-secondary">
                      🌍 UTC{' '}
                      {new Date(currentTime.toLocaleString('en-US', { timeZone: timezone })).getTimezoneOffset() > 0
                        ? '-'
                        : '+'}
                      {Math.abs(new Date(currentTime.toLocaleString('en-US', { timeZone: timezone })).getTimezoneOffset() / 60)
                        .toString()
                        .padStart(2, '0')}
                      :00
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <Globe className="w-12 h-12 text-gold/50 mx-auto mb-4" />
                <p className="text-white-secondary text-lg">No time zones selected. Choose one above to get started!</p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Time Zone Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-xl p-6 border border-gold/20 mt-12"
        >
          <h3 className="text-lg font-bold text-gold mb-3">📌 Timezone Information</h3>
          <p className="text-white-secondary text-sm leading-relaxed">
            This digital clock displays the current time in selected time zones around the world. Each timezone card shows the local time, 
            date, and UTC offset. Use the buttons above to add or remove time zones from your view. All times update automatically every second 
            to keep you synchronized with the world.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default DigitalClock

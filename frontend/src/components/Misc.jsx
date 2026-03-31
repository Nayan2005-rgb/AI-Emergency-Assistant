import { motion, AnimatePresence } from 'framer-motion';
import '../styles/components.css';
import { CARD_CONFIGS } from './EmergencyCards';

/* ============================================================
   EmergencyModal
   ============================================================ */
export function EmergencyModal({ show, countdown, onCancel, t }) {
  const TOTAL = 10;
  const circumference = 310;
  const dashOffset = circumference - (circumference * countdown / TOTAL);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
            background: 'rgba(0,0,0,0.82)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.75, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            style={{
              width: '100%', maxWidth: 360,
              borderRadius: 24,
              overflow: 'hidden',
              background: 'rgba(12, 7, 28, 0.97)',
              border: '1px solid rgba(230,57,70,0.35)',
              boxShadow: '0 0 70px rgba(230,57,70,0.25), 0 30px 60px rgba(0,0,0,0.8)',
            }}
          >
            {/* Red top line */}
            <div style={{
              height: 1,
              background: 'linear-gradient(90deg, transparent, #E63946, #F87171, transparent)',
            }} />

            <div style={{
              padding: '36px 32px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
            }}>
              <motion.span
                animate={{ scale: [1, 1.18, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ fontSize: 48 }}
              >
                🚨
              </motion.span>

              <h2 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16, fontWeight: 800,
                letterSpacing: '2px', textTransform: 'uppercase',
                color: '#EF4444',
              }}>
                {t('emergencyActivated')}
              </h2>

              {/* Countdown ring */}
              <div style={{ position: 'relative', width: 110, height: 110 }}>
                <div style={{
                  position: 'absolute',
                  inset: -8,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(230,57,70,0.12) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                }} />
                <svg className="countdown-svg" width="110" height="110" viewBox="0 0 100 100">
                  <circle className="countdown-track" cx="50" cy="50" r="44" />
                  <circle className="countdown-fill" cx="50" cy="50" r="44"
                    style={{ strokeDashoffset: dashOffset }} />
                </svg>
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 38, fontWeight: 900, color: '#EF4444',
                }}>
                  {countdown}
                </div>
              </div>

              <p style={{ fontSize: 13, color: 'rgba(160,178,220,0.7)', textAlign: 'center' }}>
                {t('callingIn')}
              </p>

              <button
                onClick={onCancel}
                style={{
                  width: '100%', padding: '12px',
                  borderRadius: 12, border: '1px solid rgba(239,68,68,0.3)',
                  background: 'rgba(239,68,68,0.1)',
                  color: '#F87171',
                  fontSize: 13, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
                  cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => e.target.style.background = 'rgba(239,68,68,0.2)'}
                onMouseLeave={e => e.target.style.background = 'rgba(239,68,68,0.1)'}
              >
                {t('cancel')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


/* ============================================================
   MapCard
   ============================================================ */
export function MapCard({ location, hospitals = [], emergencyLocation, t }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      style={{
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        background: 'rgba(15, 20, 35, 0.60)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
      }}
    >
      {/* Top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: '8%', right: '8%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.35), rgba(59,130,246,0.35), transparent)',
      }} />

      {/* Header row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="neon-dot" style={{ width: 7, height: 7 }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', letterSpacing: '0.3px' }}>
            {t('yourLocation')}
          </span>
        </div>
        {location && (
          <span style={{
            fontSize: 11,
            fontFamily: 'monospace',
            padding: '3px 10px',
            borderRadius: 8,
            background: 'rgba(139,92,246,0.12)',
            border: '1px solid rgba(139,92,246,0.22)',
            color: 'rgba(196,181,253,0.85)',
            letterSpacing: '0.5px',
          }}>
            {location.lat.toFixed(4)},&nbsp;{location.lng.toFixed(4)}
          </span>
        )}
      </div>

      {/* Map visual */}
      <div className="map-visual map-grid" style={{
        position: 'relative',
        height: 120,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(8, 10, 25, 0.7)',
        overflow: 'hidden',
      }}>
        {/* Ambient glow */}
        <div className="map-ambient-glow" style={{
          position: 'absolute',
          width: 180, height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
        }} />

        {/* Expanding rings */}
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="map-ring"
            style={{
              position: 'absolute',
              width: 20, height: 20,
              borderRadius: '50%',
              border: '1px solid rgba(139,92,246,0.45)',
              animation: `ring-expand 2.2s ease-out ${i * 0.6}s infinite`,
            }}
          />
        ))}

        {/* Hospitals */}
        {hospitals.map((hospital, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${20 + i * 15}%`,
              top: `${15 + i * 10}%`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              fontSize: 12,
            }}
          >
            <span className="hospital-pin" style={{
              fontSize: 12,
            }}>🏥</span>
            <span className="hospital-label" style={{
              fontSize: 8,
              fontFamily: 'monospace',
              padding: '1px 4px',
              borderRadius: 4,
              background: 'rgba(239,68,68,0.2)',
              border: '1px solid rgba(239,68,68,0.4)',
              color: '#fff',
              whiteSpace: 'nowrap',
            }}>
              {hospital.distance}mi
            </span>
          </div>
        ))}

        {/* Emergency location pin */}
        {emergencyLocation && (
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
            animation: 'pin-bob 2s ease-in-out infinite',
          }}>
            <span style={{ fontSize: 24, color: '#EF4444' }}>🚨</span>
            <span style={{
              fontSize: 9.5,
              fontFamily: 'monospace',
              padding: '2px 8px',
              borderRadius: 6,
              background: 'rgba(239,68,68,0.3)',
              border: '1px solid rgba(239,68,68,0.5)',
              color: '#fff',
              whiteSpace: 'nowrap',
            }}>
              EMERGENCY
            </span>
          </div>
        )}

        {/* Pin */}
        <div style={{
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
          animation: emergencyLocation ? 'none' : 'pin-bob 2s ease-in-out infinite',
        }}>
          <span className="map-pin" style={{ 
            fontSize: 24,
          }}>📍</span>
          {location && (
            <span className="map-pin-label" style={{
              fontSize: 9.5,
              fontFamily: 'monospace',
              padding: '2px 8px',
              borderRadius: 6,
              background: 'rgba(0,0,0,0.65)',
              border: '1px solid rgba(139,92,246,0.22)',
              color: 'rgba(196,181,253,0.8)',
              whiteSpace: 'nowrap',
            }}>
              {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 20px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <span className="neon-dot" style={{ width: 6, height: 6 }} />
        <span style={{ fontSize: 11, color: 'rgba(150,170,210,0.55)', fontWeight: 400 }}>
          {hospitals.length > 0 
            ? `${hospitals.length} hospitals found: ${hospitals.slice(0, 2).map(h => h.name).join(', ')}${hospitals.length > 2 ? '...' : ''}`
            : t('yourCurrentLocation')
          }
        </span>
      </div>
    </motion.div>
  );
}


/* ============================================================
   Toast
   ============================================================ */
export function Toast({ show, message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: 60, x: '-50%', scale: 0.88 }}
          animate={{ opacity: 1, y: 0,  x: '-50%', scale: 1 }}
          exit={{ opacity: 0, y: 60, x: '-50%', scale: 0.88 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          style={{
            position: 'fixed', bottom: 32, left: '50%',
            zIndex: 200,
            padding: '12px 24px',
            borderRadius: 14,
            background: 'rgba(12, 15, 35, 0.97)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(139,92,246,0.3)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.6), 0 0 24px rgba(139,92,246,0.12)',
            whiteSpace: 'nowrap',
            fontSize: 13,
            fontWeight: 500,
            color: '#fff',
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   Footer
   ============================================================ */
export function Footer({ t }) {
  return (
    <footer style={{
      position: 'relative', zIndex: 10,
      marginTop: 'auto',
      background: 'rgba(5,7,20,0.75)',
      backdropFilter: 'blur(12px)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '16px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="neon-dot" style={{ width: 6, height: 6 }} />
          <span style={{ fontSize: 11, color: 'rgba(120,140,185,0.6)', fontWeight: 400 }}>
            {t('availability')}
          </span>
        </div>
        <nav style={{ display: 'flex', gap: 20 }}>
          {['privacy', 'terms', 'contact'].map(link => (
            <a key={link} href="#" style={{
              fontSize: 11, color: 'rgba(120,140,185,0.5)',
              textDecoration: 'none', transition: 'color 0.2s ease',
            }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'rgba(120,140,185,0.5)'}
            >
              {t(link)}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

import { motion } from 'framer-motion';
import '../styles/Header.css';

export default function Header({ lang, setLang, onEmergency, t }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(5, 7, 20, 0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 2px 24px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 16px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}>

        {/* ── LEFT: Logo + LIVE badge ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>

          {/* Shield icon with unique design */}
          <div style={{
            width: 32, height: 32,
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16,
            background: 'linear-gradient(135deg, rgba(59,130,246,0.4), rgba(139,92,246,0.3))',
            border: '1px solid rgba(59,130,246,0.4)',
            boxShadow: '0 0 16px rgba(59,130,246,0.3), inset 0 0 8px rgba(255,255,255,0.1)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* AI Emergency Assistant Logo */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 900,
              color: '#fff',
              textShadow: '0 0 8px rgba(59,130,246,0.6)',
            }}>
              AI
            </div>
            {/* Emergency cross icon overlay */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 20,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: 16,
                height: 2,
                background: '#fff',
                borderRadius: 1,
              }} />
              <div style={{
                width: 2,
                height: 16,
                background: '#fff',
                borderRadius: 1,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }} />
            </div>
          </div>

          {/* Title + tagline */}
          <div>
            <h1 className="gradient-text-logo" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}>
              AI EMERGENCY
            </h1>
            <h1 className="gradient-text-logo" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              lineHeight: 1,
              marginLeft: 4,
            }}>
              ASSISTANT
            </h1>
            <p style={{
              fontSize: 8,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'rgba(150,165,210,0.55)',
              marginTop: 2,
              fontWeight: 500,
            }}>
              AI-POWERED RESPONSE
            </p>
          </div>

          {/* LIVE badge - hide on mobile */}
          <div className="header-live-badge" style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '2px 8px',
            borderRadius: 16,
            background: 'rgba(57,255,20,0.08)',
            border: '1px solid rgba(57,255,20,0.25)',
          }}>
            <span className="neon-dot" style={{ width: 5, height: 5 }} />
            <span style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: '#39FF14',
            }}>{t('live')}</span>
          </div>
        </div>

        {/* ── RIGHT: Language + Emergency ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>

          {/* Language switcher */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 3,
            padding: '3px',
            borderRadius: 8,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
            {[
              { code: 'en', label: 'EN' },
              { code: 'hi', label: 'हिं' },
              { code: 'mr', label: 'मर' },
            ].map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`lang-btn ${lang === code ? 'active' : ''}`}
                style={{
                  padding: '4px 6px',
                  fontSize: 10,
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Emergency button */}
          <button 
            className="emergency-btn" 
            onClick={onEmergency}
            style={{
              padding: '6px 12px',
              fontSize: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span style={{ fontSize: 12 }}>🚨</span>
            {t('emergency')}
          </button>
        </div>
      </div>
    </motion.header>
  );
}

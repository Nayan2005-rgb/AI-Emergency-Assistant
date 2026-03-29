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
        padding: '0 28px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}>

        {/* ── LEFT: Logo + LIVE badge ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>

          {/* Shield icon */}
          <div style={{
            width: 38, height: 38,
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
            background: 'linear-gradient(135deg, rgba(109,40,217,0.35), rgba(59,130,246,0.25))',
            border: '1px solid rgba(139,92,246,0.35)',
            boxShadow: '0 0 14px rgba(109,40,217,0.25)',
          }}>
            🛡️
          </div>

          {/* Title + tagline */}
          <div>
            <h1 className="gradient-text-logo" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 17,
              fontWeight: 800,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}>
              {t('title')}
            </h1>
            <p style={{
              fontSize: 9,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: 'rgba(150,165,210,0.55)',
              marginTop: 3,
              fontWeight: 500,
            }}>
              {t('tagline')}
            </p>
          </div>

          {/* LIVE badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '4px 10px',
            borderRadius: 20,
            background: 'rgba(57,255,20,0.08)',
            border: '1px solid rgba(57,255,20,0.25)',
          }}>
            <span className="neon-dot" style={{ width: 6, height: 6 }} />
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#39FF14',
            }}>{t('live')}</span>
          </div>
        </div>

        {/* ── RIGHT: Language + Emergency ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>

          {/* Language switcher */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '4px',
            borderRadius: 10,
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
              >
                {label}
              </button>
            ))}
          </div>

          {/* Emergency button */}
          <button className="emergency-btn" onClick={onEmergency}>
            <span style={{ marginRight: 6 }}>🚨</span>
            {t('emergency')}
          </button>
        </div>
      </div>
    </motion.header>
  );
}

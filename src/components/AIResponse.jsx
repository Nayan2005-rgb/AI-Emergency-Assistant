import { motion, AnimatePresence } from 'framer-motion';
import '../styles/AIResponse.css';

export default function AIResponse({ response, t }) {
  return (
    <AnimatePresence>
      {response && (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            borderRadius: 20,
            overflow: 'hidden',
            background: 'rgba(15, 20, 35, 0.60)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(139,92,246,0.22)',
            boxShadow: '0 4px 30px rgba(0,0,0,0.35), 0 0 20px rgba(139,92,246,0.07)',
          }}
        >
          {/* Top gradient line */}
          <div style={{
            position: 'absolute', top: 0, left: '8%', right: '8%', height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.55), rgba(59,130,246,0.55), transparent)',
          }} />

          <div style={{ padding: '20px 22px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <motion.div
                animate={{ rotate: [0, -5, 5, -3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
                style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                  background: 'linear-gradient(135deg, rgba(109,40,217,0.3), rgba(59,130,246,0.25))',
                  border: '1px solid rgba(139,92,246,0.28)',
                }}
              >
                🤖
              </motion.div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#fff', letterSpacing: '0.3px' }}>
                  {t('aiTitle')}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                  <span className="neon-dot" style={{ width: 5, height: 5 }} />
                  <span style={{ fontSize: 9, color: '#39FF14', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700 }}>
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Response text */}
            <div style={{
              padding: '14px 16px',
              borderRadius: 12,
              background: 'rgba(0,0,0,0.25)',
              display: 'flex', flexDirection: 'column', gap: 2,
            }}>
              {response.split('\n').map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.035 }}
                  style={{
                    fontSize: 12.5,
                    lineHeight: 1.65,
                    color: line ? 'rgba(195, 212, 240, 0.88)' : undefined,
                    minHeight: line ? undefined : '0.5rem',
                  }}
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

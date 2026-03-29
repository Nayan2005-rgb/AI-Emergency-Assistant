import { motion, AnimatePresence } from 'framer-motion';
import '../styles/VoiceButton.css';

export default function VoiceButton({ isListening, isProcessing, onStart, t }) {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20,
      padding: '16px 0',
    }}>
      {/* Orb + sonar rings */}
      <div className="voice-orb-wrap">
        {/* 3 sonar rings */}
        <span className="sonar-ring" />
        <span className="sonar-ring" />
        <span className="sonar-ring" />

        {/* Ambient purple glow behind orb */}
        <div style={{
          position: 'absolute',
          width: 160, height: 160,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(109,40,217,0.35) 0%, transparent 70%)',
          filter: 'blur(18px)',
        }} />

        {/* Main orb button */}
        <button
          onClick={onStart}
          disabled={isListening}
          className={`voice-orb-btn ${isListening ? 'listening' : ''}`}
          aria-label={isListening ? t('listening') : t('tapToSpeak')}
        >
          <AnimatePresence mode="wait">
            {isListening ? (
              <motion.div
                key="waves"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                className="wave-bars"
              >
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="wave-bar" />
                ))}
              </motion.div>
            ) : (
              <motion.span
                key="mic"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                style={{ fontSize: 32, lineHeight: 1 }}
              >
                🎤
              </motion.span>
            )}
          </AnimatePresence>

          <span className="orb-label">
            {isListening ? t('listening') : t('tapToSpeak')}
          </span>
        </button>
      </div>

      {/* Processing spinner */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 20px',
              borderRadius: 20,
              background: 'rgba(109,40,217,0.12)',
              border: '1px solid rgba(139,92,246,0.25)',
            }}
          >
            <div style={{
              width: 16, height: 16,
              borderRadius: '50%',
              border: '2px solid rgba(139,92,246,0.3)',
              borderTopColor: '#8B5CF6',
              animation: 'spin 0.9s linear infinite',
            }} />
            <span style={{ fontSize: 12, color: 'rgba(196,181,253,0.85)', fontWeight: 500 }}>
              {t('aiProcessing')}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

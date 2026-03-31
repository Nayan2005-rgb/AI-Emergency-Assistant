import { motion, AnimatePresence } from 'framer-motion';

export default function VoiceButton({ isListening, isProcessing, onStart, t }) {
  const active = isListening || isProcessing;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {/* Heading */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          fontSize: 13,
          color: 'rgba(180,195,230,0.7)',
          letterSpacing: '0.4px',
          textAlign: 'center',
        }}
      >
        {isListening
          ? '🎙️ Listening… speak your emergency'
          : isProcessing
          ? '⏳ Processing your request…'
          : '🎤 Tap the mic & describe your emergency'}
      </motion.p>

      {/* Voice Orb */}
      <div className="voice-orb-wrap">
        {/* Sonar rings when listening */}
        <AnimatePresence>
          {isListening && (
            <>
              <motion.div
                className="sonar-ring"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ borderColor: 'rgba(239,68,68,0.35)' }}
              />
              <motion.div
                className="sonar-ring"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ borderColor: 'rgba(239,68,68,0.25)' }}
              />
              <motion.div
                className="sonar-ring"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ borderColor: 'rgba(239,68,68,0.15)' }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Main button */}
        <motion.button
          className={`voice-orb-btn ${isListening ? 'listening' : ''}`}
          onClick={onStart}
          disabled={isProcessing}
          whileHover={!active ? { scale: 1.08, boxShadow: '0 0 40px rgba(59,130,246,0.5)' } : {}}
          whileTap={!active ? { scale: 0.95 } : {}}
          aria-label="Start voice recognition"
          style={{
            opacity: isProcessing ? 0.6 : 1,
            cursor: isProcessing ? 'not-allowed' : 'pointer',
          }}
        >
          {isListening ? (
            /* Wave bars when listening */
            <div className="wave-bars">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="wave-bar" />
              ))}
            </div>
          ) : isProcessing ? (
            /* Spinner when processing */
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 28,
                height: 28,
                border: '3px solid rgba(59,130,246,0.2)',
                borderTopColor: '#3B82F6',
                borderRadius: '50%',
              }}
            />
          ) : (
            /* Mic icon */
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="1" width="6" height="12" rx="3" />
              <path d="M5 10a7 7 0 0 0 14 0" />
              <line x1="12" y1="17" x2="12" y2="21" />
              <line x1="8" y1="21" x2="16" y2="21" />
            </svg>
          )}

          <span className="orb-label">
            {isListening ? 'Listening…' : isProcessing ? 'Processing…' : t('voiceLabel') || 'Voice'}
          </span>
        </motion.button>
      </div>

      {/* Supported languages hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: 10,
          color: 'rgba(180,195,230,0.4)',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
        }}
      >
        English · Hindi · Marathi
      </motion.p>
    </div>
  );
}

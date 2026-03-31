import { motion, AnimatePresence } from 'framer-motion';
import '../styles/EmergencyCards.css';

const CARD_CONFIGS = [
  {
    id: 'medical',
    icon: '🛏️',
    accentColor: '#EF4444',
    glowColor:   'rgba(239,68,68,0.4)',
    barColor:    'linear-gradient(90deg, #EF4444, #F87171)',
    titleKey:    'medical',
    descKey:     'medicalDesc',
  },
  {
    id: 'disaster',
    icon: '⚡',
    accentColor: '#F59E0B',
    glowColor:   'rgba(245,158,11,0.4)',
    barColor:    'linear-gradient(90deg, #F59E0B, #FCD34D)',
    titleKey:    'disaster',
    descKey:     'disasterDesc',
  },
  {
    id: 'mental-health',
    icon: '🧠',
    accentColor: '#8B5CF6',
    glowColor:   'rgba(139,92,246,0.45)',
    barColor:    'linear-gradient(90deg, #8B5CF6, #A78BFA)',
    titleKey:    'mentalHealth',
    descKey:     'mentalHealthDesc',
  },
];

const containerVars = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const cardVars = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function EmergencyCards({ selected, onSelect, t }) {
  return (
    <div style={{ width: '100%' }}>

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: 28 }}
      >
        <h2 className="heading-gold" style={{ fontSize: 'clamp(22px, 3.5vw, 30px)', marginBottom: 10 }}>
          {t('whatEmergency')}
        </h2>
        <p style={{ fontSize: 13, color: 'rgba(160, 178, 220, 0.65)', fontWeight: 400, letterSpacing: '0.2px' }}>
          {t('selectCategory')}
        </p>
      </motion.div>

      {/* 3 cards in a row */}
      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="show"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          width: '100%',
        }}
        className="emergency-cards-grid"
      >
        {CARD_CONFIGS.map((card) => {
          const isSelected = selected === card.id;
          return (
            <motion.div
              key={card.id}
              variants={cardVars}
              whileHover={{
                y: -6,
                scale: 1.025,
                transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(card.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(card.id)}
              aria-pressed={isSelected}
              style={{
                position: 'relative',
                borderRadius: 20,
                overflow: 'hidden',
                cursor: 'pointer',
                background: isSelected
                  ? `rgba(15, 20, 35, 0.80)`
                  : 'rgba(15, 20, 35, 0.60)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: isSelected
                  ? `1px solid ${card.accentColor}55`
                  : '1px solid rgba(255,255,255,0.10)',
                boxShadow: isSelected
                  ? `0 8px 32px rgba(0,0,0,0.45), 0 0 28px ${card.glowColor}`
                  : '0 4px 20px rgba(0,0,0,0.35)',
                transition: 'border 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
              }}
            >
              {/* Subtle top shimmer line */}
              <div style={{
                position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)',
              }} />

              {/* Selected checkmark */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    position: 'absolute', top: 12, right: 12,
                    width: 22, height: 22,
                    borderRadius: '50%',
                    background: card.accentColor,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 800, color: '#fff',
                    boxShadow: `0 0 10px ${card.glowColor}`,
                  }}
                >
                  ✓
                </motion.div>
              )}

              {/* Card content */}
              <div className="emergency-card" style={{ 
                padding: '24px 20px 28px',
              }}>
                {/* Icon in a colored pill */}
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 4 }}
                  transition={{ type: 'spring', stiffness: 380 }}
                  className="emergency-card-icon"
                  style={{
                    width: 56, height: 56,
                    borderRadius: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28,
                    marginBottom: 18,
                    background: `linear-gradient(135deg, ${card.accentColor}22, ${card.accentColor}10)`,
                    border: `1px solid ${card.accentColor}30`,
                    boxShadow: `0 4px 16px ${card.glowColor}`,
                  }}
                >
                  {card.icon}
                </motion.div>

                {/* Title */}
                <h3 className="emergency-card-title" style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  marginBottom: 8,
                }}>
                  {t(card.titleKey)}
                </h3>

                {/* Description */}
                <p className="emergency-card-desc" style={{
                  fontSize: 12,
                  color: 'rgba(160, 178, 220, 0.65)',
                  lineHeight: 1.5,
                  fontWeight: 400,
                }}>
                  {t(card.descKey)}
                </p>
              </div>

              {/* Bottom accent bar */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                background: card.barColor,
                opacity: isSelected ? 1 : 0.45,
                transition: 'opacity 0.3s ease',
              }} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export { CARD_CONFIGS };

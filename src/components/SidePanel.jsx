import { motion, AnimatePresence } from 'framer-motion';
import '../styles/components.css';
import { CARD_CONFIGS } from './EmergencyCards';

const OPTIONS = {
  medical: [
    { icon: '🚑', textKey: 'callAmbulance',       action: 'ambulance', color: '#EF4444' },
    { icon: '🏥', textKey: 'nearestHospital',      action: 'hospital',  color: '#3B82F6' },
    { icon: '💊', textKey: 'emergencyPharmacy',    action: 'pharmacy',  color: '#10B981' },
    { icon: '👨‍⚕️', textKey: 'doctorConsultation', action: 'doctor',    color: '#8B5CF6' },
  ],
  disaster: [
    { icon: '🚒', textKey: 'fireDepartment',    action: 'fire',       color: '#F59E0B' },
    { icon: '👮', textKey: 'police',            action: 'police',     color: '#3B82F6' },
    { icon: '🚧', textKey: 'emergencyServices', action: 'emergency',  color: '#EF4444' },
    { icon: '📢', textKey: 'evacuation',        action: 'evacuation', color: '#10B981' },
  ],
  'mental-health': [
    { icon: '📞', textKey: 'crisisHotline',       action: 'hotline',   color: '#8B5CF6' },
    { icon: '👥', textKey: 'supportGroup',         action: 'support',   color: '#3B82F6' },
    { icon: '💬', textKey: 'counselor',            action: 'counselor', color: '#10B981' },
    { icon: '🏥', textKey: 'mentalHealthFacility', action: 'facility',  color: '#EC4899' },
  ],
};

export default function SidePanel({ open, selected, onClose, onOption, t }) {
  const options = selected ? OPTIONS[selected] : [];
  const cardConfig = CARD_CONFIGS.find(c => c.id === selected);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 50,
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(5px)',
            }}
          />

          {/* Drawer */}
          <motion.div
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              zIndex: 51,
              width: 340,
              display: 'flex', flexDirection: 'column',
              background: 'rgba(7, 9, 22, 0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderLeft: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '-16px 0 50px rgba(0,0,0,0.6)',
            }}
          >
            {/* Color strip on left edge */}
            <div style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, width: 3,
              background: cardConfig
                ? cardConfig.barColor
                : 'linear-gradient(180deg, #8B5CF6, #3B82F6)',
              borderRadius: '0 3px 3px 0',
            }} />

            {/* Panel header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 20px 18px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div>
                <h3 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14, fontWeight: 700,
                  letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff',
                }}>
                  {t('emergencyOptions')}
                </h3>
                {cardConfig && (
                  <p style={{ fontSize: 11, color: 'rgba(150,170,210,0.55)', marginTop: 3 }}>
                    {cardConfig.icon}&nbsp;{t(cardConfig.titleKey)}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                style={{
                  width: 30, height: 30,
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'rgba(180,195,230,0.65)',
                  fontSize: 13, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.12)'}
                onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.05)'}
              >
                ✕
              </button>
            </div>

            {/* Options list */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {options.map((opt, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => onOption(opt)}
                  style={{
                    width: '100%',
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '13px 14px',
                    borderRadius: 14,
                    border: '1px solid rgba(255,255,255,0.07)',
                    background: 'rgba(255,255,255,0.03)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                  whileHover={{
                    x: 4,
                    backgroundColor: `${opt.color}10`,
                    borderColor: `${opt.color}35`,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span style={{
                    width: 38, height: 38, flexShrink: 0,
                    borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20,
                    background: `${opt.color}14`,
                    border: `1px solid ${opt.color}28`,
                  }}>
                    {opt.icon}
                  </span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: '#fff' }}>
                    {t(opt.textKey)}
                  </span>
                  <span style={{ fontSize: 14, color: 'rgba(150,170,210,0.4)' }}>→</span>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div style={{
              padding: '14px 20px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: 10, color: 'rgba(100,120,165,0.5)', letterSpacing: '0.5px' }}>
                Guardian AI • Emergency Response System
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

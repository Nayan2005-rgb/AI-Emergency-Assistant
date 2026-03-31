import { motion } from 'framer-motion';
import '../styles/StatusBar.css';

const ITEMS = [
  { icon: '📍', labelKey: 'localEmergency', dotColor: null },
  { icon: null, labelKey: 'nearestER',       dotColor: '#39FF14' },
  { icon: null, labelKey: 'aiReady',         dotColor: '#39FF14' },
  { icon: '⚡', labelKey: 'responseTime',    dotColor: null },
];

export default function StatusBar({ location, t }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.5 }}
      style={{
        position: 'relative',
        zIndex: 40,
        background: 'rgba(5, 7, 20, 0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="status-bar" style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        gap: 0,
        overflowX: 'auto',
      }}>
        {ITEMS.map((item, i) => {
          const label = item.labelKey === 'nearestER'
            ? (location ? t('nearestER') : t('locating'))
            : t(item.labelKey);

          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '0 18px',
                  whiteSpace: 'nowrap',
                }}
                className="status-item"
              >
                {item.dotColor ? (
                  <span className="neon-dot" style={{
                    width: 7, height: 7,
                    background: item.dotColor,
                    boxShadow: `0 0 6px ${item.dotColor}`,
                  }} />
                ) : (
                  <span style={{ fontSize: 12 }}>{item.icon}</span>
                )}
                <span style={{
                  fontSize: 11.5,
                  fontWeight: 500,
                  color: 'rgba(185, 200, 235, 0.75)',
                  letterSpacing: '0.3px',
                }}>
                  {label}
                </span>
              </motion.div>
              {i < ITEMS.length - 1 && <span className="status-divider" />}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

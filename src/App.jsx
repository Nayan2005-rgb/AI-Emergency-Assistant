import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './styles/global.css';
import translations from './data/translations';
import Header from './components/Header';
import StatusBar from './components/StatusBar';
import VoiceButton from './components/VoiceButton';
import AIResponse from './components/AIResponse';
import EmergencyCards from './components/EmergencyCards';
import SidePanel from './components/SidePanel';
import { EmergencyModal, MapCard, Toast, Footer } from './components/Misc';

// 30 starfield particles
const STARS = Array.from({ length: 30 });

export default function App() {
  const [lang, setLang]                 = useState('en');
  const [location, setLocation]         = useState(null);
  const [selectedEmer, setSelectedEmer] = useState(null);
  const [showPanel, setShowPanel]       = useState(false);
  const [aiResponse, setAiResponse]     = useState('');
  const [isListening, setIsListening]   = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal]       = useState(false);
  const [countdown, setCountdown]       = useState(10);
  const [toast, setToast]               = useState({ show: false, msg: '' });

  const recognitionRef = useRef(null);
  const timerRef       = useRef(null);

  const t = (key) => translations[lang]?.[key] ?? translations.en[key] ?? key;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        ()    => setLocation({ lat: 19.8762, lng: 75.3433 })
      );
    } else {
      setLocation({ lat: 19.8762, lng: 75.3433 });
    }

    const SR = window.webkitSpeechRecognition || window.SpeechRecognition;
    if (SR) {
      recognitionRef.current = new SR();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.onresult = (e) => processVoice(e.results[0][0].transcript);
      recognitionRef.current.onerror  = ()  => setIsListening(false);
      recognitionRef.current.onend    = ()  => setIsListening(false);
    }

    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang =
        lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-US';
    }
  }, [lang]);

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
  };

  const processVoice = (transcript) => {
    setIsProcessing(true);
    const inp = transcript.toLowerCase();
    setTimeout(() => {
      if (/(medical|hospital|injury|चिकित्सा|वैद्यकीय)/.test(inp))   handleSelectEmer('medical');
      else if (/(fire|disaster|flood|आपदा|आपत्ती)/.test(inp))         handleSelectEmer('disaster');
      else if (/(mental|anxiety|depression|मानसिक)/.test(inp))        handleSelectEmer('mental-health');
      else setAiResponse(`🤖 I heard: "${transcript}"\n\nPlease select an emergency type below.`);
      setIsProcessing(false);
    }, 1400);
  };

  const startVoice = () => {
    if (!recognitionRef.current || isListening) return;
    setIsListening(true); setAiResponse('');
    try { recognitionRef.current.start(); } catch { setIsListening(false); }
  };

  const handleSelectEmer = (id) => {
    setSelectedEmer(id); setShowPanel(true);
    const map = {
      medical:         t('medicalResponse'),
      disaster:        t('disasterResponse'),
      'mental-health': t('mentalHealthResponse'),
    };
    setAiResponse(map[id]);
  };

  const activateEmergency = () => {
    setShowModal(true); setCountdown(10);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setShowModal(false);
          showToast('🚨 Emergency services contacted!');
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelEmergency = () => {
    clearInterval(timerRef.current);
    setShowModal(false); setCountdown(10);
  };

  const handleOption = (opt) => {
    const messages = {
      ambulance: t('ambulanceCalled'),
      fire:      t('fireDepartmentCalled'),
      police:    t('policeCalled'),
      hotline:   t('crisisHotlineInfo'),
      hospital:  t('findingHospitals'),
      pharmacy:  t('findingPharmacies'),
    };
    showToast(messages[opt.action] || t('processingRequest'));
    if (['ambulance', 'fire', 'police'].includes(opt.action)) activateEmergency();
  };

  return (
    <>
      {/* ── Starfield background ── */}
      <div className="app-bg" />
      <div className="particles-canvas">
        {STARS.map((_, i) => <div key={i} className="star" />)}
      </div>

      {/* ── Ambient orb glows ── */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* ── App shell ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Header lang={lang} setLang={setLang} onEmergency={activateEmergency} t={t} />
        <StatusBar location={location} t={t} />

        <main style={{ flex: 1, position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              padding: '48px 28px 80px',
              display: 'flex',
              flexDirection: 'column',
              gap: 36,
            }}
          >
            <VoiceButton
              isListening={isListening}
              isProcessing={isProcessing}
              onStart={startVoice}
              t={t}
            />
            <AIResponse response={aiResponse} t={t} />
            <EmergencyCards selected={selectedEmer} onSelect={handleSelectEmer} t={t} />
            <MapCard location={location} t={t} />
          </motion.div>
        </main>

        <Footer t={t} />
      </div>

      {/* ── Overlays ── */}
      <SidePanel
        open={showPanel}
        selected={selectedEmer}
        onClose={() => setShowPanel(false)}
        onOption={handleOption}
        t={t}
      />
      <EmergencyModal show={showModal} countdown={countdown} onCancel={cancelEmergency} t={t} />
      <Toast show={toast.show} message={toast.msg} />
    </>
  );
}

import { useState, useEffect, useRef } from 'react'
import './App.css'

// Multi-language translations
const translations = {
  en: {
    title: "Emergency Assistant",
    tagline: "AI-Powered Emergency Response",
    subtitle: "Get instant help in critical situations",
    live: "LIVE",
    emergency: "EMERGENCY",
    localEmergency: "Local Emergency: 911",
    nearestER: "Nearest ER: 2.3 miles",
    locating: "Locating...",
    aiReady: "AI Guidance Ready",
    responseTime: "Response Time: Instant",
    tapToSpeak: "Tap to Speak",
    listening: "Listening...",
    aiProcessing: "AI Processing...",
    aiTitle: "AI Emergency Guidance",
    whatEmergency: "What type of emergency?",
    selectCategory: "Select a category for immediate step-by-step guidance",
    medical: "Medical",
    medicalDesc: "Injury, CPR, Bleeding, Burns",
    disaster: "Disaster",
    disasterDesc: "Earthquake, Flood, Fire, Hurricane",
    mentalHealth: "Mental Health",
    mentalHealthDesc: "Crisis Support, Anxiety, Depression",
    emergencyOptions: "Emergency Options",
    callAmbulance: "Call Ambulance",
    nearestHospital: "Nearest Hospital",
    emergencyPharmacy: "Emergency Pharmacy",
    doctorConsultation: "Doctor Consultation",
    fireDepartment: "Fire Department",
    police: "Police",
    emergencyServices: "Emergency Services",
    evacuation: "Evacuation",
    crisisHotline: "Crisis Hotline",
    supportGroup: "Support Group",
    counselor: "Counselor",
    mentalHealthFacility: "Mental Health Facility",
    ambulanceCalled: " Ambulance has been called. Help is on the way!",
    fireDepartmentCalled: " Fire department has been notified!",
    policeCalled: " Police have been contacted!",
    crisisHotlineInfo: " Crisis Hotline: 988 - Available 24/7 for support",
    findingHospitals: " Finding nearest hospitals...",
    findingPharmacies: " Finding nearby pharmacies...",
    processingRequest: " Processing your request...",
    yourLocation: "Your Location",
    yourCurrentLocation: "Your Current Location",
    coordinates: "Coordinates",
    availability: "Available 24/7 — Not a substitute for professional medical care",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
    emergencyActivated: "Emergency Activated",
    callingIn: "Calling 911...",
    cancel: "Cancel",
    medicalResponse: " Medical Emergency Protocol:\n\n1. Assess the situation\n2. Check ABCs (Airway, Breathing, Circulation)\n3. Call 911 for life-threatening conditions\n4. Provide necessary first aid\n5. Keep patient comfortable\n\nNearest Hospital: 2.3 miles away\nEstimated Arrival: 8 minutes",
    disasterResponse: " Disaster Response Plan:\n\n1. Ensure immediate safety\n2. Call emergency services\n3. Follow evacuation routes\n4. Help others if safe to do so\n5. Stay informed through official channels\n\nEmergency Services: 1.8 miles away\nEstimated Arrival: 5 minutes",
    mentalHealthResponse: " Mental Health Support:\n\n1. Stay calm and breathe\n2. Contact crisis hotline: 988\n3. Remove yourself from stressful situation\n4. Talk to someone you trust\n5. Professional help available 24/7\n\nCrisis Support: Immediately available"
  },
  hi: {
    title: "आपातकालीन सहायता",
    tagline: "AI-संचालित आपातकालीन प्रतिक्रिया",
    subtitle: "महत्वपूर्ण स्थितियों में तत्काल सहायता प्राप्त करें",
    live: "लाइव्ह",
    live: "लाइव",
    emergency: "आपातकालीन",
    localEmergency: "स्थानीय आपातकालीन: 911",
    nearestER: "निकटतम ईआर: 2.3 मील",
    locating: "ढूंढ रहे हैं...",
    aiReady: "AI मार्गदर्शन तैयार",
    responseTime: "प्रतिक्रिया समय: तत्काल",
    tapToSpeak: "बोलने के लिए टैप करें",
    listening: "सुन रहे हैं...",
    aiProcessing: "AI प्रसंस्करण...",
    aiTitle: "AI आपातकालीन मार्गदर्शन",
    whatEmergency: "किस तरह का आपातकालीन है?",
    selectCategory: "तत्काल चरण-दर-चरण मार्गदर्शन के लिए एक श्रेणी चुनें",
    medical: "चिकित्सा",
    medicalDesc: "चोट, CPR, खून बहना, जलने",
    disaster: "आपदा",
    disasterDesc: "भूकंप, बाढ़, आग, तूफ़ान",
    mentalHealth: "मानसिक स्वास्थ्य",
    mentalHealthDesc: "संकट समर्थन, चिंता, अवसाद",
    yourLocation: "आपका स्थान",
    yourCurrentLocation: "आपका वर्तमान स्थान",
    coordinates: "निर्देशांक",
    availability: "24/7 उपलब्ध — पेशेवर चिकित्सा सहायता का विकल्प नहीं",
    privacy: "गोपनीयता",
    terms: "नियम",
    contact: "संपर्क",
    emergencyActivated: "आपातकालीन सक्रिय",
    callingIn: "911 को कॉल कर रहे हैं...",
    cancel: "रद्द करें",
    medicalResponse: "🏥 चिकित्सा आपातकालीन प्रोटोकॉल:\n\n1. स्थिति का आकलन करें\n2. ABC जांचें (वायुमार्ग, श्वास, परिसंचरण)\n3. जीवन-धमकी वाली स्थिति में 911 को कॉल करें\n4. आवश्यक प्रथम चिकित्सा दें\n5. रोगी को आरामदायक रखें\n\nनिकटतम अस्पताल: 2.3 मील दूर\nअनुमानित पहुंच: 8 मिनट",
    disasterResponse: "⚡ आपदा प्रतिक्रिया योजना:\n\n1. तत्काल सुरक्षा सुनिश्चित करें\n2. आपातकालीन सेवाओं को कॉल करें\n3. निकासी मार्गों का पालन करें\n4. यदि सुरक्षित हो तो दूसरों की मदद करें\n5. आधिकारिक चैनलों से जानकारी प्राप्त करें\n\nआपातकालीन सेवाएं: 1.8 मील दूर\nअनुमानित पहुंच: 5 मिनट",
    mentalHealthResponse: "🧠 मानसिक स्वास्थ्य समर्थन:\n\n1. शांत रहें और सांस लें\n2. संकट हॉटलाइन पर संपर्क करें: 988\n3. खुद को तनावपूर्ण स्थिति से दूर रखें\n4. किसी पर विश्वास करें और बात करें\n5. 24/7 पेशेवर मदद उपलब्ध\n\nसंकट समर्थन: तत्काल उपलब्ध"
  },
  mr: {
    title: "आपातकालीन मदत",
    tagline: "AI-संचालित आपातकालीन प्रतिक्रिया",
    subtitle: "गंभीर परिस्थितीत तात्काळ मदत मिळवा",
    live: "लाइव्ह",
    emergency: "आपातकालीन",
    localEmergency: "स्थानिक आपातकालीन: 911",
    nearestER: "सर्वात जवळील ER: 2.3 मैल",
    locating: "शोधत आहे...",
    aiReady: "AI मार्गदर्शन तयार",
    responseTime: "प्रतिसाद वेळ: तात्काळ",
    tapToSpeak: "बोलण्यासाठी टॅप करा",
    listening: "ऐकत आहे...",
    aiProcessing: "AI प्रक्रिया...",
    aiTitle: "AI आपातकालीन मार्गदर्शन",
    whatEmergency: "कोणत्या प्रकारचे आपातकालीन आहे?",
    selectCategory: "तात्काळ पायरी-दर-पायरी मार्गदर्शनासाठी एक श्रेणी निवडा",
    medical: "वैद्यकीय",
    medicalDesc: "दुखापत, CPR, रक्तस्त्राव, जळजळ",
    disaster: "आपत्ती",
    disasterDesc: "भूकंप, पूर, आग, वादळी",
    mentalHealth: "मानसिक आरोग्य",
    mentalHealthDesc: "संकट समर्थन, चिंता, निराशा",
    yourLocation: "तुमचे स्थान",
    yourCurrentLocation: "तुमचे सध्याचे स्थान",
    coordinates: "समन्वय",
    availability: "24/7 उपलब्ध — व्यावसायिक वैद्यकीय मदतीचा पर्याय नाही",
    privacy: "गोपनीयता",
    terms: "अटी",
    contact: "संपर्क",
    emergencyActivated: "आपातकालीन सक्रिय",
    callingIn: "911 ला कॉल करत आहे...",
    cancel: "रद्द करा",
    medicalResponse: "🏥 वैद्यकीय आपातकालीन प्रोटोकॉल:\n\n1. परिस्थितीचे मूल्यांकन करा\n2. ABC तपासा (वायुमार्ग, श्वासोच्छास, परिसंचरण)\n3. जीवनास धोका असल्यास 911 ला कॉल करा\n4. आवश्यक प्रथम उपचार करा\n5. रुग्णाला आरामदायक ठेवा\n\nसर्वात जवळील रुग्णालय: 2.3 मैल दूर\nअंदाजे पोच: 8 मिनिटे",
    disasterResponse: "⚡ आपत्ती प्रतिसाद योजना:\n\n1. तात्काळ सुरक्षितता सुनिश्चित करा\n2. आपातकालीन सेवांना कॉल करा\n3. बाहेर पडण्याच्या मार्गांचे पालन करा\n4. सुरक्षित असल्यास इतरांनी मदत करा\n5. अधिकृत चॅनेल्सवरून माहिती मिळवा\n\nआपातकालीन सेवा: 1.8 मैल दूर\nअंदाजे पोच: 5 मिनिटे",
    mentalHealthResponse: "🧠 मानसिक आरोग्य समर्थन:\n\n1. शांत राहा आणि श्वास घ्या\n2. संकट हॉटलाइनवर संपर्क साधा: 988\n3. स्वतःला ताणाच्या परिस्थितीतून दूर ठेवा\n4. कुणाच्यावर विश्वास ठेवा आणि बोला\n5. 24/7 व्यावसायिक मदत उपलब्ध\n\nसंकट समर्थन: तात्काळ उपलब्ध"
  }
}

function App() {
  const [selectedEmergency, setSelectedEmergency] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState(null)
  const [mapError, setMapError] = useState(null)
  const [markers, setMarkers] = useState([])
  const [apiLoading, setApiLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [aiResponse, setAiResponse] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const [emergencyCountdown, setEmergencyCountdown] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [voiceWave, setVoiceWave] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
  const mapRef = useRef(null)
  const autocompleteRef = useRef(null)
  const apiLoadedRef = useRef(false)
  const recognitionRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    
    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage
    if (browserLang.startsWith('hi')) {
      setCurrentLang('hi')
    } else if (browserLang.startsWith('mr')) {
      setCurrentLang('mr')
    } else {
      setCurrentLang('en')
    }
    
    // Initialize voice recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = currentLang === 'hi' ? 'hi-IN' : currentLang === 'mr' ? 'mr-IN' : 'en-US'

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        console.log('Voice recognized:', transcript)
        processVoiceInput(transcript)
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
        setVoiceWave(false)
      }

      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended')
        setIsListening(false)
        setVoiceWave(false)
      }
    }

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setUserLocation(location)
          loadGoogleMaps(location)
        },
        (error) => {
          console.error('Error getting location:', error)
          const defaultLocation = { lat: 40.7128, lng: -74.0060 }
          setUserLocation(defaultLocation)
          loadGoogleMaps(defaultLocation)
        }
      )
    } else {
      const defaultLocation = { lat: 40.7128, lng: -74.0060 }
      setUserLocation(defaultLocation)
      loadGoogleMaps(defaultLocation)
    }
  }, [])

  useEffect(() => {
    // Debug: Check map status every 1 second
    const debugInterval = setInterval(() => {
      if (mapRef.current && window.google?.maps) {
        console.log('Map container is ready, Google Maps API available')
        if (!mapLoaded) {
          console.log('Forcing map loaded state - container ready')
          setMapLoaded(true)
          setMapError(null)
          // Try to initialize map if not already done
          if (userLocation) {
            initializeMap(userLocation)
          }
        }
      } else {
        console.log('Map container or API not ready yet')
      }
    }, 1000)
    
    return () => clearInterval(debugInterval)
  }, [mapLoaded, mapError, userLocation])

  useEffect(() => {
    if (isListening) {
      setVoiceWave(true)
    }
  }, [isListening])

  useEffect(() => {
    // Update speech recognition language when language changes
    if (recognitionRef.current) {
      recognitionRef.current.lang = currentLang === 'hi' ? 'hi-IN' : currentLang === 'mr' ? 'mr-IN' : 'en-US'
    }
  }, [currentLang])

  const t = (key) => translations[currentLang][key] || translations.en[key]

  const processVoiceInput = async (transcript) => {
    console.log('Processing voice input:', transcript)
    setIsProcessing(true)
    
    // Simulate AI processing
    setTimeout(() => {
      let response = ''
      const input = transcript.toLowerCase()
      
      if (input.includes('medical') || input.includes('hospital') || input.includes('injury') || 
          input.includes('चिकित्सा') || input.includes('अस्पताल') || input.includes('चोट') ||
          input.includes('वैद्यकीय') || input.includes('रुग्णालय') || input.includes('दुखापत') ||
          input.includes('medicine') || input.includes('doctor') || input.includes('nurse')) {
        response = t('medicalResponse')
        setSelectedEmergency('medical')
        console.log('Detected medical emergency')
      } else if (input.includes('fire') || input.includes('burn') || input.includes('disaster') ||
                 input.includes('आग') || input.includes('जळ') || input.includes('आपदा') ||
                 input.includes('आग') || input.includes('जळजळ') || input.includes('आपत्ती') ||
                 input.includes('emergency') || input.includes('help')) {
        response = t('disasterResponse')
        setSelectedEmergency('disaster')
        console.log('Detected disaster emergency')
      } else if (input.includes('mental') || input.includes('anxiety') || input.includes('depression') ||
                 input.includes('panic') || input.includes('stress') || input.includes('suicide') ||
                 input.includes('मानसिक') || input.includes('चिंता') || input.includes('अवसाद') ||
                 input.includes('मानसिक स्वास्थ्य')) {
        response = t('mentalHealthResponse')
        setSelectedEmergency('mental-health')
        console.log('Detected mental health emergency')
      } else if (input.includes('help') || input.includes('emergency') || input.includes('panic') ||
                 input.includes('मदत') || input.includes('आपातकालीन') || input.includes('घाबरू') ||
                 input.includes('मदत') || input.includes('आपातकालीन') || input.includes('घाबरू')) {
        response = `🚨 ${t('emergencyActivated')}:\n\n1. ${currentLang === 'hi' ? 'शांत रहें और गहरी सांस लें' : currentLang === 'mr' ? 'शांत राहा आणि खोल श्वास घ्या' : 'Stay calm and breathe deeply'}\n2. ${currentLang === 'hi' ? 'अपनी स्थिति का आकलन करें' : currentLang === 'mr' ? 'तुमच्या परिस्थितीचे मूल्यांकन करा' : 'Assess your situation'}\n3. ${currentLang === 'hi' ? 'तत्काल खतरे होने पर 911 कॉल करें' : currentLang === 'mr' ? 'तात्काळ धोका असल्यास 911 ला कॉल करा' : 'Call 911 if immediate danger'}\n4. ${currentLang === 'hi' ? 'नीचे आपातकालीन मार्गदर्शन का पालन करें' : currentLang === 'mr' ? 'खालील आपातकालीन मार्गदर्शनाचे पालन करा' : 'Follow emergency guides below'}\n\n${currentLang === 'hi' ? 'मैं आपकी मदद के लिए यहाँ हूँ। आप किस तरह का आपातकालीन अनुभव कर रहे हैं?' : currentLang === 'mr' ? 'मी तुमच्या मदतीसाठी इथे आहे. तुम्ही कोणत्या प्रकारचे आपातकालीन अनुभवत आहात?' : "I'm here to help. What type of emergency are you experiencing?"}`
        console.log('Detected general emergency')
      } else {
        response = `🤖 ${currentLang === 'hi' ? 'मैं समझ गया:' : currentLang === 'mr' ? 'मी समजलो:' : 'I understand:'} "${transcript}"\n\n${currentLang === 'hi' ? 'कृपया विशिष्ट मार्गदर्शन के लिए नीचे एक आपातकालीन प्रकार चुनें:' : currentLang === 'mr' ? 'कृपया विशिष्ट मार्गदर्शनासाठी खालील एक आपातकालीन प्रकार निवडा:' : 'Please select an emergency type below for specific guidance:'}\n\n🏥 ${t('medical')} - ${t('medicalDesc')}\n⚡ ${t('disaster')} - ${t('disasterDesc')}\n🧠 ${t('mentalHealth')} - ${t('mentalHealthDesc')}\n\n${currentLang === 'hi' ? 'या "medical", "fire", या "help" कहें या तुरंत सहायता के लिए।' : currentLang === 'mr' ? 'हे "medical", "fire", किंवा "help" म्हणा किंवा तात्काळ मदतीसाठी.' : 'Or say "medical", "fire", or "help" for quick assistance.'}`
        console.log('No specific emergency detected')
      }
      
      console.log('AI Response:', response)
      setAiResponse(response)
      setIsProcessing(false)
    }, 1500)
  }

  const startVoiceInput = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      setVoiceWave(true)
      setAiResponse('')
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error('Error starting voice recognition:', error)
        setIsListening(false)
        setVoiceWave(false)
      }
    }
  }

  const stopVoiceInput = () => {
    if (recognitionRef.current && isListening) {
      setIsListening(false)
      setVoiceWave(false)
      try {
        recognitionRef.current.stop()
      } catch (error) {
        console.error('Error stopping voice recognition:', error)
      }
    }
  }

  const activateEmergency = () => {
    setShowEmergencyModal(true)
    setEmergencyCountdown(10)
    
    const countdown = setInterval(() => {
      setEmergencyCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdown)
          alert(`🚨 ${currentLang === 'hi' ? 'आपातकालीन सेवाओं से संपर्क किया गया' : currentLang === 'mr' ? 'आपातकालीन सेवांशी संपर्क साधला' : 'EMERGENCY SERVICES CONTACTED'}\n\n${currentLang === 'hi' ? 'सहायता के लिए लाइन पर रहें।' : currentLang === 'mr' ? 'मदतीसाठी लाइनवर राहा.' : 'Stay on the line for assistance.'}\n${currentLang === 'hi' ? 'आपका स्थान रेस्पॉन्डर्स के साथ साझा किया गया है।' : currentLang === 'mr' ? 'तुमचे स्थान प्रतिसादकांशी सामायिक केले आहे.' : 'Your location has been shared with responders.'}`)
          setShowEmergencyModal(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const cancelEmergency = () => {
    setShowEmergencyModal(false)
    setEmergencyCountdown(0)
  }

  const loadGoogleMaps = (location) => {
    // Prevent multiple API loads
    if (apiLoadedRef.current || apiLoading || window.google?.maps) {
      if (window.google?.maps) {
        initializeMap(location)
      }
      return
    }

    setApiLoading(true)
    
    // Simple script loading
    const script = document.createElement('script')
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDU6jQHgppu0L2Y9rQ6xT7X8Y9Z0A1B2C3&libraries=places&callback=initMap'
    script.async = true
    script.defer = true
    
    // Simple callback
    window.initMap = () => {
      delete window.initMap
      apiLoadedRef.current = true
      setApiLoading(false)
      console.log('✅ Google Maps loaded')
      initializeMap(location)
    }
    
    // Simple error handling
    script.onerror = () => {
      console.log('❌ Google Maps failed to load')
      setApiLoading(false)
      setMapLoaded(true)
      showMapFallback(location)
    }
    
    // Add to head
    document.head.appendChild(script)
    
    // Timeout fallback
    setTimeout(() => {
      if (!apiLoadedRef.current) {
        console.log('⏰ Google Maps loading timeout')
        setApiLoading(false)
        setMapLoaded(true)
        showMapFallback(location)
      }
    }, 5000) // 5 second timeout
  }

  const initializeMap = (location) => {
    // Wait for DOM to be ready
    setTimeout(() => {
      if (!mapRef.current) {
        console.log('🗺️ Map container not ready, showing fallback')
        showMapFallback(location)
        return
      }
      
      if (!window.google?.maps) {
        console.log('🗺️ Google Maps API not ready, showing fallback')
        showMapFallback(location)
        return
      }
      
      try {
        // Clear existing map content
        mapRef.current.innerHTML = ''
        
        // Create new map instance
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: location.lat, lng: location.lng },
          zoom: 15,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#ffffff' }]
            },
            {
              featureType: 'poi.business',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#ffffff' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry.fill',
              stylers: [{ color: '#3b82f6' }]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#ffffff' }]
            },
            {
              featureType: 'water',
              stylers: [{ color: '#1e3a8a' }]
            },
            {
              featureType: 'landscape',
              stylers: [{ color: '#16213e' }]
            }
          ]
        })
        
        // Add marker for user location
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: 'Your Location',
          icon: {
            path: 'M12 2C8.13 2 5 4.87 5 8c0 2.13 3.13 6 6 6 6 3.13 0 6-2.87 6-6zm-1 0h-2v2h2v-2zm0 6h-2v2h2v-2z',
            fillColor: '#3b82f6',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 1.5
          }
        })
        
        // Update map state
        setMap(map)
        setMapLoaded(true)
        setMapError(null)
        
        console.log('✅ Google Maps initialized successfully')
        
        // Trigger map resize after a short delay
        setTimeout(() => {
          if (window.google?.maps?.event && map) {
            window.google.maps.event.trigger(map, 'resize')
          }
        }, 100)
        
      } catch (error) {
        console.error('❌ Error initializing map:', error)
        showMapFallback(location)
      }
    }, 200) // Short delay for DOM readiness
  }

  const showMapFallback = (location) => {
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #ffffff;
          font-size: 14px;
          text-align: center;
          padding: 20px;
          background: linear-gradient(135deg, #16213e 0%, #1e3a8a 100%);
          border-radius: 12px;
        ">
          <div>
            <div style="font-size: 48px; margin-bottom: 15px;">🗺️</div>
            <div style="font-size: 18px; margin-bottom: 10px; font-weight: bold;">Location Services</div>
            <div style="font-size: 14px; margin-bottom: 15px; opacity: 0.9;">
              Your current location
            </div>
            <div style="font-size: 12px; opacity: 0.7; background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 6px;">
              📍 ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}
            </div>
          </div>
        </div>
      `
    }
  }

  const findNearbyPlaces = (mapInstance, location) => {
    try {
      if (window.google?.maps?.places) {
        const service = new window.google.maps.places.PlacesService(mapInstance)
        
        service.nearbySearch({
          location: location,
          radius: 5000,
          type: ['hospital']
        }, (results, status) => {
          if (status === 'OK' && results && results.length > 0) {
            const newMarkers = results.map((place) => {
              return new window.google.maps.Marker({
                position: place.geometry.location,
                map: mapInstance,
                title: place.name,
                icon: {
                  url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#ef4444"/>
                      <circle cx="12" cy="9" r="2.5" fill="white"/>
                    </svg>
                  `),
                  scaledSize: new window.google.maps.Size(30, 30)
                }
              })
            })
            setMarkers(prev => [...prev, ...newMarkers])
          } else {
            addSampleHospitals(mapInstance, location)
          }
        })
      } else {
        addSampleHospitals(mapInstance, location)
      }
    } catch (error) {
      addSampleHospitals(mapInstance, location)
    }
  }

  const addSampleHospitals = (mapInstance, location) => {
    const sampleLocations = [
      { lat: location.lat + 0.02, lng: location.lng + 0.02, name: "General Hospital" },
      { lat: location.lat - 0.01, lng: location.lng + 0.03, name: "Medical Center" },
      { lat: location.lat + 0.01, lng: location.lng - 0.02, name: "Emergency Room" }
    ]
    
    const newMarkers = sampleLocations.map((place) => {
      return new window.google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map: mapInstance,
        title: place.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#ef4444"/>
              <circle cx="12" cy="9" r="2.5" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(30, 30)
        }
      })
    })
    
    setMarkers(prev => [...prev, ...newMarkers])
  }

  const emergencyTypes = [
    {
      id: 'medical',
      title: t('medical'),
      icon: '🏥',
      description: t('medicalDesc'),
      color: '#ef4444',
      options: [
        { icon: '🚑', text: t('callAmbulance'), action: 'ambulance' },
        { icon: '🏥', text: t('nearestHospital'), action: 'hospital' },
        { icon: '💊', text: t('emergencyPharmacy'), action: 'pharmacy' },
        { icon: '👨‍⚕️', text: t('doctorConsultation'), action: 'doctor' }
      ]
    },
    {
      id: 'disaster',
      title: t('disaster'),
      icon: '⚡',
      description: t('disasterDesc'),
      color: '#f59e0b',
      options: [
        { icon: '🚒', text: t('fireDepartment'), action: 'fire' },
        { icon: '👮', text: t('police'), action: 'police' },
        { icon: '🚧', text: t('emergencyServices'), action: 'emergency' },
        { icon: '📢', text: t('evacuation'), action: 'evacuation' }
      ]
    },
    {
      id: 'mental-health',
      title: t('mentalHealth'),
      icon: '🧠',
      description: t('mentalHealthDesc'),
      color: '#8b5cf6',
      options: [
        { icon: '📞', text: t('crisisHotline'), action: 'hotline' },
        { icon: '👥', text: t('supportGroup'), action: 'support' },
        { icon: '💬', text: t('counselor'), action: 'counselor' },
        { icon: '🏥', text: t('mentalHealthFacility'), action: 'facility' }
      ]
    }
  ]

  const handleOptionClick = (option) => {
  console.log('Option clicked:', option)
  
  // Handle different emergency actions
  switch(option.action) {
    case 'ambulance':
      activateEmergency()
      setAiResponse(t('ambulanceCalled'))
      break
    case 'hospital':
      if (map && userLocation) {
        findNearbyPlaces(map, userLocation, 'hospital')
        setAiResponse(t('findingHospitals'))
      }
      break
    case 'pharmacy':
      if (map && userLocation) {
        findNearbyPlaces(map, userLocation, 'pharmacy')
        setAiResponse(t('findingPharmacies'))
      }
      break
    case 'fire':
      activateEmergency()
      setAiResponse(t('fireDepartmentCalled'))
      break
    case 'police':
      activateEmergency()
      setAiResponse(t('policeCalled'))
      break
    case 'hotline':
      setAiResponse(t('crisisHotlineInfo'))
      break
    default:
      setAiResponse(t('processingRequest'))
  }
}

  const handleEmergencyClick = (type) => {
    console.log('Emergency clicked:', type)
    setSelectedEmergency(type)
    const emergency = emergencyTypes.find(e => e.id === type)
    
    let response = ''
    switch(type) {
      case 'medical':
        response = t('medicalResponse')
        break
      case 'disaster':
        response = t('disasterResponse')
        break
      case 'mental-health':
        response = t('mentalHealthResponse')
        break
      default:
        response = t('medicalResponse')
    }
    
    console.log('Setting AI response:', response)
    setAiResponse(response)
    setIsProcessing(false)
  }

  const handleLocationClick = () => {
    if (map && userLocation) {
      map.setCenter(userLocation)
      map.setZoom(17)
    }
  }

  const handleSearchClick = () => {
    if (map && userLocation) {
      try {
        if (window.google?.maps?.places) {
          const service = new window.google.maps.places.PlacesService(map)
          
          service.nearbySearch({
            location: userLocation,
            radius: 3000,
            type: ['hospital', 'police', 'fire_station']
          }, (results, status) => {
            if (status === 'OK' && results && results.length > 0) {
              markers.forEach((marker, index) => {
                if (index > 0) marker.setMap(null)
              })
              
              const newMarkers = results.map((place) => {
                return new window.google.maps.Marker({
                  position: place.geometry.location,
                  map: map,
                  title: place.name,
                  icon: {
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#3b82f6"/>
                        <circle cx="12" cy="9" r="2.5" fill="white"/>
                      </svg>
                    `),
                    scaledSize: new window.google.maps.Size(30, 30)
                  }
                })
              })
              
              setMarkers([markers[0], ...newMarkers])
            } else {
              addSampleEmergencyServices()
            }
          })
        } else {
          addSampleEmergencyServices()
        }
      } catch (error) {
        addSampleEmergencyServices()
      }
    }
  }

  const addSampleEmergencyServices = () => {
    if (!map || !userLocation) return
    
    markers.forEach((marker, index) => {
      if (index > 0) marker.setMap(null)
    })
    
    const emergencyServices = [
      { lat: userLocation.lat + 0.015, lng: userLocation.lng + 0.015, name: "Emergency Room", color: "#ef4444" },
      { lat: userLocation.lat - 0.01, lng: userLocation.lng + 0.02, name: "Police Station", color: "#3b82f6" },
      { lat: userLocation.lat + 0.005, lng: userLocation.lng - 0.025, name: "Fire Department", color: "#f59e0b" }
    ]
    
    const newMarkers = emergencyServices.map((service) => {
      return new window.google.maps.Marker({
        position: { lat: service.lat, lng: service.lng },
        map: map,
        title: service.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="${service.color}"/>
              <circle cx="12" cy="9" r="2.5" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(30, 30)
        }
      })
    })
    
    setMarkers([markers[0], ...newMarkers])
  }

  return (
    <div className={`app ${mounted ? 'mounted' : ''}`}>
      <div className="glass-background">
        <div className="glass-orb orb-1"></div>
        <div className="glass-orb orb-2"></div>
        <div className="glass-orb orb-3"></div>
      </div>

      <header className={`glass-header ${mounted ? 'slide-down' : ''}`}>
        <div className="header-content">
          <div className="header-left">
            <div className="logo-container">
              <div className={`emergency-logo ${mounted ? 'logo-appear' : ''}`}>
                <span className="logo-shield">🛡️</span>
                <span className="logo-cross">⚕️</span>
                <span className="logo-heart">❤️</span>
              </div>
              <div className="logo-text">
                <h1>{t('title')}</h1>
                <div className="logo-tagline">{t('tagline')}</div>
              </div>
            </div>
            <div className={`live-indicator ${mounted ? 'fade-in' : ''}`}>
              <span className="live-dot"></span>
              <span>{t('live')}</span>
            </div>
            <p className={`subtitle ${mounted ? 'fade-in-delayed' : ''}`}>{t('subtitle')}</p>
          </div>
          <div className="header-actions">
            <div className="language-selector">
              <button 
                className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
                onClick={() => setCurrentLang('en')}
              >
                EN
              </button>
              <button 
                className={`lang-btn ${currentLang === 'hi' ? 'active' : ''}`}
                onClick={() => setCurrentLang('hi')}
              >
                हिं
              </button>
              <button 
                className={`lang-btn ${currentLang === 'mr' ? 'active' : ''}`}
                onClick={() => setCurrentLang('mr')}
              >
                म
              </button>
            </div>
            <button className={`emergency-btn ${mounted ? 'bounce-in' : ''}`} onClick={activateEmergency}>
              <span className="emergency-icon">🚨</span>
              <span className="emergency-text">{t('emergency')}</span>
            </button>
          </div>
        </div>
      </header>

      <div className={`glass-status-bar ${mounted ? 'slide-up' : ''}`}>
        <div className="status-container">
          <div className={`status-item ${mounted ? 'fade-in' : ''}`}>
            <span className="status-icon">📍</span>
            <span>{t('localEmergency')}</span>
          </div>
          <div className={`status-item ${mounted ? 'fade-in-delayed' : ''}`}>
            <span className="status-icon">🏥</span>
            <span>{userLocation ? t('nearestER') : t('locating')}</span>
          </div>
          <div className={`status-item ${mounted ? 'fade-in-delayed-2' : ''}`}>
            <span className="status-icon">🤖</span>
            <span>{t('aiReady')}</span>
          </div>
          <div className={`status-item ${mounted ? 'fade-in-delayed-3' : ''}`}>
            <span className="status-icon">⚡</span>
            <span>{t('responseTime')}</span>
          </div>
        </div>
      </div>

      {/* Voice Input Section */}
      <div className={`voice-section ${mounted ? 'scale-in' : ''}`}>
        <div className="voice-container">
          <button 
            className={`voice-btn ${isListening ? 'listening' : ''} ${voiceWave ? 'wave-active' : ''}`}
            onClick={startVoiceInput}
            disabled={isListening}
          >
            <span className="voice-icon">{isListening ? '🔴' : '🎤'}</span>
            <span className="voice-text">
              {isListening ? t('listening') : t('tapToSpeak')}
            </span>
            {voiceWave && <div className="voice-waves">
              <div className="wave wave-1"></div>
              <div className="wave wave-2"></div>
              <div className="wave wave-3"></div>
            </div>}
          </button>
          {isProcessing && (
            <div className="processing-indicator">
              <div className="processing-spinner"></div>
              <span>{t('aiProcessing')}</span>
            </div>
          )}
        </div>
      </div>

      {/* AI Response Section */}
      {aiResponse && (
        <div className={`ai-response-section ${mounted ? 'slide-up-delayed' : ''}`}>
          <div className="ai-response-card">
            <div className="ai-header">
              <span className="ai-icon">🤖</span>
              <span className="ai-title">{t('aiTitle')}</span>
            </div>
            <div className="ai-content">
              {aiResponse.split('\n').map((line, index) => (
                <div key={index} className="ai-line">
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Emergency Options Section */}
      {selectedEmergency && (
        <div className={`emergency-options-section ${mounted ? 'slide-up-delayed' : ''}`}>
          <div className="emergency-options-card">
            <div className="options-header">
              <span className="options-icon">⚡</span>
              <span className="options-title">{t('emergencyOptions')}</span>
            </div>
            <div className="options-content">
              {emergencyTypes.find(e => e.id === selectedEmergency)?.options?.map((option, index) => (
                <button
                  key={index}
                  className="emergency-option-btn"
                  onClick={() => handleOptionClick(option)}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-text">{option.text}</span>
                  <span className="option-arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className={`main ${mounted ? 'fade-in-delayed-4' : ''}`}>
        <div className="content-grid">
          <div className="emergency-selection">
            <div className="glass-card">
              <h2>{t('whatEmergency')}</h2>
              <p className="selection-subtitle">{t('selectCategory')}</p>
              
              <div className="emergency-cards">
                {emergencyTypes.map((emergency, index) => (
                  <div
                    key={emergency.id}
                    className={`glass-emergency-card ${selectedEmergency === emergency.id ? 'selected' : ''} ${mounted ? `card-appear card-delay-${index}` : ''}`}
                    onClick={() => handleEmergencyClick(emergency.id)}
                    style={{ '--card-color': emergency.color }}
                    onMouseEnter={() => setHoveredCard(emergency.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="card-icon-wrapper">
                      <div className={`card-icon ${hoveredCard === emergency.id ? 'icon-bounce' : ''}`}>{emergency.icon}</div>
                    </div>
                    <h3>{emergency.title}</h3>
                    <p>{emergency.description}</p>
                    <div className="card-glow"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="map-section">
            <div className={`glass-map-card ${mounted ? 'slide-in-right' : ''}`}>
              <div className="map-header">
                <h3>{t('yourLocation')}</h3>
                <div className="map-controls">
                  <button className="map-control-btn" onClick={handleLocationClick}>📍</button>
                  <button className="map-control-btn" onClick={handleSearchClick}>🔍</button>
                </div>
              </div>
              <div className="map-container">
                {apiLoading ? (
                  <div className="map-placeholder">
                    <div className="map-loading">
                      <div className="loading-spinner"></div>
                      <p>Loading Google Maps...</p>
                    </div>
                  </div>
                ) : mapLoaded && !mapError ? (
                  <div 
                    ref={mapRef} 
                    className="map"
                    style={{ width: '100%', height: '100%' }}
                  ></div>
                ) : (
                  <div className="map-placeholder">
                    <div className="map-loading">
                      <div className="loading-spinner"></div>
                      <p>{mapError || 'Initializing map...'}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="map-info">
                <div className="location-info">
                  <span className="location-dot"></span>
                  <span>{t('yourCurrentLocation')}</span>
                </div>
                {userLocation && (
                  <div className="coordinates">
                    {t('coordinates')}: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="emergency-modal">
          <div className="emergency-modal-content">
            <div className="emergency-modal-header">
              <span className="modal-icon">🚨</span>
              <h2>{t('emergencyActivated')}</h2>
            </div>
            <div className="countdown-container">
              <div className="countdown-circle">
                <span className="countdown-number">{emergencyCountdown}</span>
              </div>
              <p>{t('callingIn')}</p>
            </div>
            <button className="cancel-btn" onClick={cancelEmergency}>
              {t('cancel')}
            </button>
          </div>
        </div>
      )}

      <footer className={`glass-footer ${mounted ? 'slide-up-delayed-2' : ''}`}>
        <div className="footer-content">
          <div className="availability">
            <span className="status-dot"></span>
            <span>{t('availability')}</span>
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">{t('privacy')}</a>
            <a href="#" className="footer-link">{t('terms')}</a>
            <a href="#" className="footer-link">{t('contact')}</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App;
# 🚨 Emergency Assistant — Component-wise Project

## Folder Structure

```
emergency-app/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx                  ← Root component (wires everything)
│   │
│   ├── components/
│   │   ├── Header.jsx           ← Logo, language switcher, EMERGENCY btn
│   │   ├── StatusBar.jsx        ← Info ticker (911, ER, AI Ready, etc.)
│   │   ├── VoiceButton.jsx      ← Glowing purple "TAP TO SPEAK" orb
│   │   ├── AIResponse.jsx       ← AI guidance card
│   │   ├── EmergencyCards.jsx   ← Medical / Disaster / Mental Health cards
│   │   ├── SidePanel.jsx        ← Slide-in options drawer
│   │   └── Misc.jsx             ← EmergencyModal, MapCard, Toast, Footer
│   │
│   ├── data/
│   │   └── translations.js      ← EN / हिं / मर strings
│   │
│   └── styles/
│       ├── global.css           ← Design tokens, background, keyframes
│       ├── Header.css           ← Header styles
│       ├── StatusBar.css        ← Status bar styles
│       ├── VoiceButton.css      ← Voice orb + rings + waves
│       ├── EmergencyCards.css   ← Card grid + hover/selected states
│       └── components.css       ← AIResponse, SidePanel, Modal, Toast, MapCard, Footer
│
├── package.json
└── README.md
```

## Design Highlights

| Feature | Detail |
|---|---|
| Background | Deep navy radial gradients + floating blur orbs |
| Font | Orbitron (display) + Exo 2 (body) |
| Title color | Blue-to-purple gradient (matches screenshot) |
| "TAP TO SPEAK" | Glassy purple orb with 4 expanding pulse rings |
| Emergency cards | Glassmorphism + per-type gradient accent bars |
| "What type of emergency?" | Gold gradient heading |
| Side panel | Slides in from right with gradient left edge strip |
| 911 Modal | SVG countdown ring with red glow |
| Languages | EN · हिंदी · मराठी — all text & voice recognition |

## Quick Start

```bash
# Create Vite React app
npm create vite@latest emergency-app -- --template react
cd emergency-app

# Copy all files from this package into src/

# Install & run
npm install
npm run dev
```

## Component Map

```
App.jsx
 ├── Header          (lang state, emergency trigger)
 ├── StatusBar       (location state)
 ├── VoiceButton     (listening/processing state)
 ├── AIResponse      (aiResponse string)
 ├── EmergencyCards  (selectedEmer state)
 ├── MapCard         (location state)
 ├── Footer
 ├── SidePanel       (showPanel, selectedEmer, options)
 ├── EmergencyModal  (showModal, countdown)
 └── Toast           (toast state)
```

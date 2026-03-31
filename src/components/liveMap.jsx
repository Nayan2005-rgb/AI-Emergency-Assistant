import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function LiveMap({ location, hospitals = [], emergencyLocation }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Load Leaflet from CDN
  useEffect(() => {
    const loadLeaflet = () => {
      // Check if already loaded
      if (window.L) {
        setLeafletLoaded(true);
        return;
      }

      // Load Leaflet CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Load Leaflet JS
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        // Fix default icon issue
        if (window.L) {
          delete window.L.Icon.Default.prototype._getIconUrl;
          window.L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
            iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
          });
          setLeafletLoaded(true);
        }
      };
      document.body.appendChild(script);
    };

    loadLeaflet();
  }, []);

  // Initialize Leaflet map
  useEffect(() => {
    if (leafletLoaded && mapRef.current && !map && window.L && location) {
      try {
        // Initialize map
        const leafletMap = window.L.map(mapRef.current, {
          center: [location.lat, location.lng],
          zoom: 14,
          zoomControl: true,
          attributionControl: true
        });

        // Add OpenStreetMap tile layer
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: ' OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(leafletMap);

        setMap(leafletMap);

        // Force map to render properly
        setTimeout(() => {
          leafletMap.invalidateSize();
        }, 100);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }
  }, [leafletLoaded, location]);

  // Update markers when location or hospitals change
  useEffect(() => {
    if (map && window.L && location) {
      // Clear existing markers
      markers.forEach(marker => map.removeLayer(marker));
      const newMarkers = [];

      // Add user location marker
      const userIcon = window.L.icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      
      const userMarker = window.L.marker([location.lat, location.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup('Your Location');
      newMarkers.push(userMarker);

      // Add hospital markers
      hospitals.forEach((hospital, index) => {
        const hospitalIcon = window.L.icon({
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
        
        const hospitalMarker = window.L.marker([hospital.lat, hospital.lng], { icon: hospitalIcon })
          .addTo(map)
          .bindPopup(`${hospital.name} - ${hospital.distance} miles`);
        newMarkers.push(hospitalMarker);
      });

      // Add emergency location marker
      if (emergencyLocation) {
        const emergencyIcon = window.L.icon({
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
        
        const emergencyMarker = window.L.marker([emergencyLocation.lat, emergencyLocation.lng], { icon: emergencyIcon })
          .addTo(map)
          .bindPopup('Emergency Location');
        newMarkers.push(emergencyMarker);
      }

      setMarkers(newMarkers);

      // Fit map to show all markers
      if (newMarkers.length > 0) {
        const group = new window.L.featureGroup(newMarkers);
        map.fitBounds(group.getBounds().pad(0.1));
      }
    }
  }, [map, location, hospitals, emergencyLocation]);

  // Update map center when location changes
  useEffect(() => {
    if (map && location && window.L) {
      map.setView([location.lat, location.lng], 14);
    }
  }, [map, location]);

  return (
    <motion.div
      className="glass-card-premium p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-xl font-bold neon-blue-text mb-4">
        Live Map
      </h2>

      <div className="h-64 rounded-xl overflow-hidden relative bg-gray-900">
        {!leafletLoaded || !location ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              Loading map...
            </div>
          </div>
        ) : (
          <div 
            ref={mapRef} 
            style={{ 
              height: "100%", 
              width: "100%",
              minHeight: "256px",
              zIndex: 1
            }}
            className="leaflet-map-container"
          />
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .leaflet-map-container {
          z-index: 1 !important;
        }
        
        .leaflet-container {
          background: #1a1a1a !important;
          border-radius: 12px !important;
          z-index: 1 !important;
        }
        
        .leaflet-control-attribution {
          background: rgba(0,0,0,0.7) !important;
          color: white !important;
        }

        .leaflet-control-zoom {
          background: rgba(0,0,0,0.7) !important;
          border: 1px solid rgba(255,255,255,0.2) !important;
        }

        .leaflet-control-zoom a {
          background: rgba(59,130,246,0.8) !important;
          color: white !important;
          border: 1px solid rgba(255,255,255,0.2) !important;
        }

        .leaflet-control-zoom a:hover {
          background: rgba(59,130,246,1) !important;
        }

        /* Remove any fake map elements */
        .map-grid {
          display: none !important;
        }
        .neon-dot {
          display: none !important;
        }
        `
      }} />
    </motion.div>
  );
}
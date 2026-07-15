import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useTheme } from './context/ThemeContext';

const { width } = Dimensions.get('window');

// ─────────────────────────────────────────────
// Koordinat lokasi restoran (Jakarta Selatan)
// ─────────────────────────────────────────────
const RESTAURANT_LAT = -6.2297;
const RESTAURANT_LNG = 106.827;
const DELIVERY_LAT = -6.2352;
const DELIVERY_LNG = 106.8335;

// ─────────────────────────────────────────────
// HTML peta menggunakan Leaflet.js + OpenStreetMap
// (tidak memerlukan Google Maps API Key)
// ─────────────────────────────────────────────
const buildMapHTML = (isDark) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: ${isDark ? '#0F172A' : '#EFF6FF'}; }
    #map { width: 100%; height: 100vh; }
    .custom-popup .leaflet-popup-content-wrapper {
      background: #1D4ED8;
      color: white;
      border-radius: 14px;
      border: none;
      box-shadow: 0 8px 28px rgba(29, 78, 216, 0.45);
      padding: 0;
    }
    .custom-popup .leaflet-popup-content {
      margin: 14px 16px;
    }
    .custom-popup .leaflet-popup-tip {
      background: #1D4ED8;
    }
    .custom-popup-green .leaflet-popup-content-wrapper {
      background: #059669;
      color: white;
      border-radius: 14px;
      border: none;
      box-shadow: 0 8px 28px rgba(5, 150, 105, 0.45);
    }
    .custom-popup-green .leaflet-popup-content {
      margin: 14px 16px;
    }
    .custom-popup-green .leaflet-popup-tip {
      background: #059669;
    }
    .popup-title { font-weight: bold; font-size: 14px; margin-bottom: 4px; }
    .popup-sub { font-size: 12px; opacity: 0.88; margin-bottom: 6px; }
    .popup-badge {
      background: rgba(255,255,255,0.22);
      border-radius: 8px;
      padding: 3px 8px;
      font-size: 11px;
      display: inline-block;
    }
    .leaflet-control-attribution { display: none; }
  </style>
</head>
<body>
<div id="map"></div>
<script>
  // Inisialisasi peta
  const map = L.map('map', { zoomControl: true, attributionControl: false })
    .setView([${(RESTAURANT_LAT + DELIVERY_LAT) / 2}, ${(RESTAURANT_LNG + DELIVERY_LNG) / 2}], 14);

  // Tile layer OpenStreetMap (gratis, tanpa API Key)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

  // ── Ikon restoran ──
  const restaurantIcon = L.divIcon({
    html: '<div style="background:#1D4ED8;width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;border:3.5px solid white;box-shadow:0 4px 16px rgba(29,78,216,0.55);">🍽️</div>',
    className: '',
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -28],
  });

  // ── Ikon tujuan pengiriman ──
  const deliveryIcon = L.divIcon({
    html: '<div style="background:#059669;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;border:3.5px solid white;box-shadow:0 4px 16px rgba(5,150,105,0.55);">📍</div>',
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -24],
  });

  // ── Marker Restoran ──
  const restaurantMarker = L.marker([${RESTAURANT_LAT}, ${RESTAURANT_LNG}], { icon: restaurantIcon }).addTo(map);
  restaurantMarker.bindPopup(
    '<div class="popup-title">🍽️ FlavorDash Restaurant</div>' +
    '<div class="popup-sub">Jl. Sudirman No. 1, Jakarta Selatan</div>' +
    '<div class="popup-badge">⭐ 4.8 · Buka 10:00–22:00</div>',
    { className: 'custom-popup', maxWidth: 210 }
  ).openPopup();

  // ── Marker Lokasi Pengiriman ──
  const deliveryMarker = L.marker([${DELIVERY_LAT}, ${DELIVERY_LNG}], { icon: deliveryIcon }).addTo(map);
  deliveryMarker.bindPopup(
    '<div class="popup-title">📍 Lokasi Pengiriman</div>' +
    '<div class="popup-sub">Jl. Gatot Subroto, Jakarta Selatan</div>' +
    '<div class="popup-badge">🕒 Estimasi: 15–20 menit</div>',
    { className: 'custom-popup-green', maxWidth: 210 }
  );

  // ── Garis rute (dashed) ──
  L.polyline(
    [[${RESTAURANT_LAT}, ${RESTAURANT_LNG}], [${DELIVERY_LAT}, ${DELIVERY_LNG}]],
    { color: '#3B82F6', weight: 4, opacity: 0.75, dashArray: '10, 10' }
  ).addTo(map);
</script>
</body>
</html>
`;

export default function MapsScreen() {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={theme.statusBar} backgroundColor={theme.headerBg} />

      {/* ── Legenda ── */}
      <View style={[styles.legend, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.legendItem}>
          <Text style={styles.legendIcon}>🍽️</Text>
          <Text style={[styles.legendText, { color: theme.text }]}>Restoran</Text>
        </View>
        <View style={[styles.legendDivider, { backgroundColor: theme.border }]} />
        <View style={styles.legendItem}>
          <Text style={styles.legendIcon}>📍</Text>
          <Text style={[styles.legendText, { color: theme.text }]}>Lokasi Antar</Text>
        </View>
        <View style={[styles.legendDivider, { backgroundColor: theme.border }]} />
        <View style={styles.legendItem}>
          <Text style={[styles.legendRouteLine, { color: theme.primary }]}>- -</Text>
          <Text style={[styles.legendText, { color: theme.text }]}>Rute</Text>
        </View>
      </View>

      {/* ── Peta (WebView + Leaflet) ── */}
      <View style={styles.mapWrapper}>
        {isLoading && (
          <View style={[styles.loadingOverlay, { backgroundColor: theme.bg }]}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={[styles.loadingText, { color: theme.subtext }]}>Memuat peta...</Text>
          </View>
        )}
        <WebView
          source={{ html: buildMapHTML(isDark) }}
          style={styles.webview}
          onLoad={() => setIsLoading(false)}
          javaScriptEnabled
          domStorageEnabled
          mixedContentMode="always"
          originWhitelist={['*']}
          startInLoadingState={false}
        />
      </View>

      {/* ── Info Card Restoran ── */}
      <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
        <View style={[styles.infoIconBox, { backgroundColor: theme.primarySoft }]}>
          <Text style={styles.infoIcon}>🍽️</Text>
        </View>
        <View style={styles.infoText}>
          <Text style={[styles.infoTitle, { color: theme.text }]}>FlavorDash Restaurant</Text>
          <Text style={[styles.infoSub, { color: theme.subtext }]}>
            Jl. Sudirman No. 1, Jakarta Selatan
          </Text>
        </View>
        <View style={[styles.infoBadge, { backgroundColor: theme.primarySoft }]}>
          <Text style={[styles.infoBadgeText, { color: theme.primary }]}>⭐ 4.8</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  // ── Legenda ──
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: '5%',
    borderBottomWidth: 1,
    gap: 14,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendIcon: { fontSize: 15 },
  legendRouteLine: { fontSize: 16, fontWeight: '900', letterSpacing: -2 },
  legendText: { fontSize: width * 0.031, fontWeight: '500' },
  legendDivider: { width: 1, height: 18 },

  // ── Peta ──
  mapWrapper: { flex: 1 },
  webview: { flex: 1 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    zIndex: 10,
  },
  loadingText: { fontSize: 14 },

  // ── Info Card ──
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    gap: 12,
  },
  infoIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: { fontSize: 22 },
  infoText: { flex: 1 },
  infoTitle: { fontSize: width * 0.038, fontWeight: '700' },
  infoSub: { fontSize: width * 0.03, marginTop: 2 },
  infoBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  infoBadgeText: { fontSize: 13, fontWeight: '700' },
});

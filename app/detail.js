import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from './context/ThemeContext';

const { width } = Dimensions.get('window');

// ─────────────────────────────────────────────
// Komponen helper: Row info pesanan
// ─────────────────────────────────────────────
function InfoRow({ label, value, theme, isHighlight = false }) {
  return (
    <View style={styles.infoRow}>
      <Text style={[styles.infoLabel, { color: theme.subtext }]}>{label}</Text>
      <Text
        style={[
          styles.infoValue,
          { color: isHighlight ? theme.primary : theme.text },
          isHighlight && styles.infoValueHighlight,
        ]}
        numberOfLines={2}
      >
        {value}
      </Text>
    </View>
  );
}

export default function DetailScreen() {
  const { id, name, price, image, quantity, status, cuisine } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();

  // Jika tidak ada data, tampilkan fallback
  if (!name) {
    return (
      <View style={[styles.container, { backgroundColor: theme.bg }]}>
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Pesanan tidak ditemukan</Text>
          <TouchableOpacity
            style={[styles.backBtn, { backgroundColor: theme.primary }]}
            onPress={() => router.back()}
          >
            <Text style={styles.backBtnText}>Kembali ke Katalog</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={theme.statusBar} backgroundColor={theme.headerBg} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ── Gambar makanan ── */}
        {image ? (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
            {/* Badge status aktif di atas gambar */}
            <View style={[styles.activeBadge, { backgroundColor: theme.primary }]}>
              <Text style={styles.activeBadgeText}>📦 Pesanan Aktif</Text>
            </View>
          </View>
        ) : null}

        {/* ── Kartu detail pesanan ── */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Detail Pesanan</Text>

          <InfoRow label="ID Pesanan" value={`ORD-${id}992`} theme={theme} />
          <InfoRow label="Menu" value={name} theme={theme} />
          {cuisine ? <InfoRow label="Masakan" value={cuisine} theme={theme} /> : null}
          <InfoRow label="Jumlah" value={`${quantity || 1} porsi`} theme={theme} />
          <InfoRow label="Harga" value={price} theme={theme} />

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          {/* Status pesanan — disorot dengan warna primary */}
          <InfoRow label="Status" value={status || 'Siap Diantar'} theme={theme} isHighlight />

          {/* Total */}
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: theme.subtext }]}>Total Bayar</Text>
            <Text style={[styles.totalValue, { color: theme.primary }]}>{price}</Text>
          </View>
        </View>

        {/* ── Tombol Aksi ── */}
        <View style={styles.actionsContainer}>
          {/* Tombol kamera */}
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: theme.primary, shadowColor: theme.primary }]}
            onPress={() => router.push('/camera')}
            activeOpacity={0.85}
          >
            <Text style={styles.actionBtnIcon}>📷</Text>
            <Text style={[styles.actionBtnText, { color: '#FFFFFF' }]}>Ambil Bukti Foto</Text>
          </TouchableOpacity>

          {/* Tombol maps */}
          <TouchableOpacity
            style={[
              styles.actionBtn,
              styles.actionBtnOutline,
              { backgroundColor: theme.primarySoft, borderColor: theme.primary },
            ]}
            onPress={() => router.push('/maps')}
            activeOpacity={0.85}
          >
            <Text style={styles.actionBtnIcon}>📍</Text>
            <Text style={[styles.actionBtnText, { color: theme.primary }]}>Lihat Lokasi Restoran</Text>
          </TouchableOpacity>

          {/* Tombol kembali */}
          <TouchableOpacity
            style={[styles.returnBtn, { backgroundColor: theme.card, borderColor: theme.border }]}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={[styles.returnBtnText, { color: theme.subtext }]}>← Kembali ke Katalog</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    padding: '5%',
    gap: 16,
    paddingBottom: 32,
  },

  // ── Gambar ──
  imageWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: width * 0.55,
  },
  activeBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 22,
  },
  activeBadgeText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },

  // ── Kartu info ──
  card: {
    borderRadius: 20,
    padding: '6%',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  infoLabel: {
    fontSize: width * 0.038,
    flex: 0.45,
  },
  infoValue: {
    fontSize: width * 0.038,
    fontWeight: '500',
    flex: 0.55,
    textAlign: 'right',
  },
  infoValueHighlight: {
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginVertical: 14,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  totalLabel: {
    fontSize: width * 0.04,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: width * 0.06,
    fontWeight: '900',
  },

  // ── Tombol aksi ──
  actionsContainer: { gap: 12 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    padding: 16,
    gap: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  actionBtnOutline: {
    borderWidth: 1.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  actionBtnIcon: { fontSize: 20 },
  actionBtnText: {
    fontSize: width * 0.042,
    fontWeight: '700',
  },
  returnBtn: {
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  returnBtnText: {
    fontSize: width * 0.037,
    fontWeight: '500',
  },
  backBtn: {
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  backBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

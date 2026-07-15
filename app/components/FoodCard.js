import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

// ─────────────────────────────────────────────
// FoodCard — Komponen reusable untuk item makanan
// Menggunakan Flexbox row: gambar di kiri, info di kanan
// Layout responsif menggunakan Dimensions dan persentase
// ─────────────────────────────────────────────
export default function FoodCard({ item, onPress, theme }) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.cardBorder,
          shadowColor: theme.shadow,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.83}
    >
      {/* Gambar makanan di sebelah kiri (FR-04) */}
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Informasi makanan di sebelah kanan */}
      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.description, { color: theme.subtext }]} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Baris harga dan badge status */}
        <View style={styles.bottomRow}>
          <Text style={[styles.price, { color: theme.price }]}>{item.price}</Text>
          {item.status && (
            <View style={[styles.badge, { backgroundColor: theme.badge }]}>
              <Text style={[styles.badgeText, { color: theme.badgeText }]} numberOfLines={1}>
                {item.status}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',         // Gambar kiri, info kanan (FR-04)
    borderRadius: 16,
    padding: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
  },

  // Gambar — ukuran responsif berdasarkan lebar layar
  image: {
    width: width * 0.22,
    height: width * 0.22,
    borderRadius: 12,
    marginRight: 14,
    flexShrink: 0,
  },

  // Informasi — mengisi sisa ruang (flex: 1)
  info: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  name: {
    fontSize: width * 0.042,
    fontWeight: 'bold',
    lineHeight: width * 0.054,
  },
  description: {
    fontSize: width * 0.032,
    lineHeight: width * 0.045,
  },

  // Baris bawah: harga + badge
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    flexWrap: 'wrap',
    gap: 6,
  },
  price: {
    fontSize: width * 0.04,
    fontWeight: '700',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    maxWidth: '55%',
  },
  badgeText: {
    fontSize: width * 0.026,
    fontWeight: '600',
  },
});

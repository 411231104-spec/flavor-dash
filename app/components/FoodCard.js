import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Komponen FoodCard reusable
export default function FoodCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      {/* Gambar makanan di kiri */}
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Deskripsi di kanan, menggunakan flex: 1 untuk responsive */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row', // Layout flexbox baris (gambar di kiri, text di kanan)
    backgroundColor: '#1E293B',
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4, // Untuk bayangan di Android
    borderWidth: 1,
    borderColor: '#334155',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1, // Memenuhi sisa ruang di sebelah kanan
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F59E0B', // Warna amber khas
  },
});

import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { foodData } from './data/foodData';

export default function DetailScreen() {
  // Mengambil parameter dari route
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const item = foodData.find(f => String(f.id) === String(id));

  if (!item) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Pesanan tidak ditemukan</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Kembali ke Katalog</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Detail Pesanan</Text>

        {item.image && (
          <Image source={{ uri: item.image }} style={styles.image} />
        )}

        <View style={styles.row}>
          <Text style={styles.label}>ID Pesanan:</Text>
          <Text style={styles.value}>ORD-{id}992</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Menu:</Text>
          <Text style={styles.value}>{item.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Harga:</Text>
          <Text style={styles.value}>{item.price}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={[styles.label, styles.totalLabel]}>Total:</Text>
          <Text style={[styles.value, styles.totalValue]}>{item.price}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Kembali ke Katalog</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 24,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#94A3B8',
  },
  value: {
    fontSize: 16,
    color: '#F8FAFC',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 16,
  },
  totalLabel: {
    fontWeight: 'bold',
    color: '#000408ff',
  },
  totalValue: {
    fontWeight: 'bold',
    color: '#F59E0B',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

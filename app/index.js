import { useRouter } from 'expo-router';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FoodCard from './components/FoodCard';
import { useAuth } from './context/AuthContext';
import { foodData } from './data/foodData';

export default function CatalogScreen() {
  const router = useRouter();
  const { logout } = useAuth();

  const handlePressDetail = (item) => {
    // Navigasi ke halaman detail pesanan
    // (Karena ada proteksi route di AuthContext, jika token ada akan lolos)
    router.push({
      pathname: '/detail',
      params: { id: item.id, name: item.name, price: item.price, image: item.image }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <View style={styles.container}>
        {/* Modern App Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FlavorDash</Text>
          <TouchableOpacity onPress={logout} style={styles.logoutButton} activeOpacity={0.7}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Rekomendasi Menu</Text>
        </View>

        {/* Menggunakan ScrollView untuk menampilkan list makanan */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {foodData.map((food) => (
            <FoodCard
              key={food.id}
              item={food}
              onPress={() => handlePressDetail(food)}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: 0.5,
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  logoutText: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '700',
  },
  sectionHeaderRow: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 16,
  },
});

import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FoodCard from './components/FoodCard';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import { getFoods } from './services/foodService';

const { width } = Dimensions.get('window');

export default function CatalogScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();

  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Muat data makanan dari Mock API saat komponen pertama kali dimuat
  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getFoods();
      setFoods(data);
    } catch {
      setError('Gagal memuat data makanan. Cek koneksi internet.');
    } finally {
      setIsLoading(false);
    }
  };

  // Navigasi ke halaman detail dengan membawa data item
  const handlePressDetail = (item) => {
    router.push({
      pathname: '/detail',
      params: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        status: item.status,
        cuisine: item.cuisine,
      },
    });
  };

  return (
    // SafeAreaView dengan warna header agar area notch ikut berwarna
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.headerBg }]} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={theme.headerBg} />

      {/* ── Header ── */}
      <View style={[styles.header, { backgroundColor: theme.headerBg, borderBottomColor: theme.headerBorder }]}>
        <View style={styles.headerLeft}>
          <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>FlavorDash</Text>
          <Text style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.72)' }]}>
            🍽️ Pesan, Nikmati, Bahagia
          </Text>
        </View>

        <View style={styles.headerRight}>
          {/* Tombol toggle light/dark */}
          <TouchableOpacity
            onPress={toggleTheme}
            style={styles.iconBtn}
            activeOpacity={0.75}
          >
            <Text style={styles.iconBtnText}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>

          {/* Tombol logout */}
          <TouchableOpacity
            onPress={logout}
            style={[styles.logoutBtn, { backgroundColor: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.35)' }]}
            activeOpacity={0.75}
          >
            <Text style={[styles.logoutText, { color: '#FFFFFF' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Konten Utama ── */}
      <View style={[styles.content, { backgroundColor: theme.bg }]}>
        {/* Section header */}
        <View style={[styles.sectionRow, { borderBottomColor: theme.bgSecondary }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Rekomendasi Menu</Text>
          <TouchableOpacity onPress={loadFoods} activeOpacity={0.7}>
            <Text style={[styles.refreshBtn, { color: theme.primary }]}>↺  Refresh</Text>
          </TouchableOpacity>
        </View>

        {/* Loading state */}
        {isLoading ? (
          <View style={styles.centerView}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={[styles.loadingText, { color: theme.subtext }]}>Memuat menu dari API...</Text>
          </View>
        ) : error ? (
          /* Error state */
          <View style={styles.centerView}>
            <Text style={styles.errorEmoji}>😕</Text>
            <Text style={[styles.errorText, { color: theme.subtext }]}>{error}</Text>
            <TouchableOpacity
              style={[styles.retryBtn, { backgroundColor: theme.primary }]}
              onPress={loadFoods}
            >
              <Text style={styles.retryBtnText}>Coba Lagi</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Daftar makanan */
          <ScrollView
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {foods.map((food) => (
              <FoodCard
                key={food.id}
                item={food}
                onPress={() => handlePressDetail(food)}
                theme={theme}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: width * 0.062,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  headerSubtitle: {
    fontSize: width * 0.031,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBtnText: { fontSize: 17 },
  logoutBtn: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
  },
  logoutText: {
    fontSize: width * 0.034,
    fontWeight: '700',
  },

  // ── Konten ──
  content: {
    flex: 1,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingTop: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: width * 0.048,
    fontWeight: 'bold',
  },
  refreshBtn: {
    fontSize: width * 0.034,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: '5%',
    paddingTop: 14,
    paddingBottom: 28,
    gap: 14,
  },

  // ── States ──
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 14,
    marginTop: 4,
  },
  errorEmoji: { fontSize: 48 },
  errorText: {
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: '10%',
  },
  retryBtn: {
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 4,
  },
  retryBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});

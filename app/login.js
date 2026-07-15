import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();

  const handleLogin = () => {
    // Memanggil fungsi login dari AuthContext (menyimpan JWT ke AsyncStorage)
    login(username, password);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]} edges={['top']}>
      <StatusBar barStyle={theme.statusBar} backgroundColor={theme.bg} />

      {/* Tombol toggle light/dark */}
      <TouchableOpacity
        onPress={toggleTheme}
        style={[styles.themeToggle, { backgroundColor: theme.primarySoft, borderColor: theme.border }]}
        activeOpacity={0.8}
      >
        <Text style={styles.themeToggleIcon}>{isDark ? '☀️' : '🌙'}</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.formWrapper}>
          {/* ── Logo ── */}
          <View style={[styles.logoBox, { backgroundColor: theme.primary, shadowColor: theme.primary }]}>
            <Text style={styles.logoEmoji}>🍽️</Text>
          </View>

          <Text style={[styles.title, { color: theme.primary }]}>FlavorDash</Text>
          <Text style={[styles.subtitle, { color: theme.subtext }]}>Masuk ke akun Anda</Text>

          {/* ── Input Username ── */}
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBg,
                borderColor: theme.inputBorder,
                color: theme.inputText,
              },
            ]}
            placeholder="Username"
            placeholderTextColor={theme.inputPlaceholder}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* ── Input Password ── */}
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBg,
                borderColor: theme.inputBorder,
                color: theme.inputText,
              },
            ]}
            placeholder="Password"
            placeholderTextColor={theme.inputPlaceholder}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* ── Tombol Login ── */}
          <TouchableOpacity
            style={[styles.loginBtn, { backgroundColor: theme.primary, shadowColor: theme.primary }]}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.loginBtnText}>Masuk →</Text>
          </TouchableOpacity>

          {/* ── Hint ── */}
          <Text style={[styles.hint, { color: theme.subtext }]}>
            * Masukkan username dan password apapun untuk login
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  flex: { flex: 1 },

  // ── Theme Toggle ──
  themeToggle: {
    position: 'absolute',
    top: height * 0.065,
    right: '5%',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    zIndex: 10,
  },
  themeToggleIcon: { fontSize: 20 },

  // ── Form ──
  formWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '8%',
    gap: 0,
  },
  logoBox: {
    width: width * 0.22,
    height: width * 0.22,
    borderRadius: width * 0.11,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  logoEmoji: { fontSize: width * 0.1 },
  title: {
    fontSize: width * 0.08,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: width * 0.04,
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1.5,
    fontSize: 16,
  },
  loginBtn: {
    width: '100%',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
  hint: {
    marginTop: 20,
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: '5%',
  },
});

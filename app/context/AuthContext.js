import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Key untuk menyimpan token di AsyncStorage
const TOKEN_KEY = 'flavourdash_jwt_token';

// Membuat Context untuk Authentication
const AuthContext = createContext({});

// ─────────────────────────────────────────────
// Simulasi pembuatan JWT token (format: header.payload.signature)
// Dalam aplikasi nyata, token ini diperoleh dari server/API
// ─────────────────────────────────────────────
function generateMockJWT(username) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: username,
      name: username,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 hari
    })
  );
  // Simulasi signature (dalam produksi digenerate server dengan secret key)
  const signature = btoa(`${username}-flavourdash-secret`).replace(/=/g, '');
  return `${header}.${payload}.${signature}`;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  // ─── Load token dari AsyncStorage saat app pertama kali dijalankan ───
  useEffect(() => {
    const loadToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem(TOKEN_KEY);
        if (savedToken) {
          setToken(savedToken);
        }
      } catch (error) {
        console.log('[AuthContext] Error loading token:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  // ─── Route Protection: redirect berdasarkan status token ───
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'login';

    if (!token && !inAuthGroup) {
      // Tidak ada token → arahkan ke login
      router.replace('/login');
    } else if (token && inAuthGroup) {
      // Ada token dan di halaman login → arahkan ke halaman utama
      router.replace('/');
    }
  }, [token, segments, isLoading]);

  // ─── Login: generate JWT dan simpan ke AsyncStorage ───
  const login = async (username, password) => {
    if (username && password) {
      const jwt = generateMockJWT(username);
      setToken(jwt);
      try {
        await AsyncStorage.setItem(TOKEN_KEY, jwt);
        console.log('[AuthContext] Token saved to AsyncStorage');
      } catch (error) {
        console.log('[AuthContext] Error saving token:', error);
      }
    }
  };

  // ─── Logout: hapus token dari state dan AsyncStorage ───
  const logout = async () => {
    setToken(null);
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      console.log('[AuthContext] Token removed from AsyncStorage');
    } catch (error) {
      console.log('[AuthContext] Error removing token:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook untuk memudahkan penggunaan AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// Dummy default export agar Expo Router tidak warning
export default function AuthContextRoute() {
  return null;
}

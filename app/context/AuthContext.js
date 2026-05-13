import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';

// Membuat Context untuk Authentication
const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  // Efek ini berjalan setiap kali token atau route segments berubah
  // untuk menentukan apakah user boleh mengakses halaman tertentu
  useEffect(() => {
    // Tunggu sampai loading selesai
    if (isLoading) return;

    // Cek apakah user sedang berada di halaman login
    const inAuthGroup = segments[0] === 'login';

    if (!token && !inAuthGroup) {
      // Jika tidak ada token dan user tidak di halaman login, arahkan ke login
      router.replace('/login');
    } else if (token && inAuthGroup) {
      // Jika ada token dan user di halaman login, arahkan ke halaman utama
      router.replace('/');
    }
  }, [token, segments, isLoading]);

  // Fungsi untuk simulasi login (set JWT token palsu)
  const login = (username, password) => {
    // Dalam aplikasi nyata, ini akan memanggil API dan mengembalikan JWT token
    if (username && password) {
      setToken('dummy-jwt-token-xyz123');
    }
  };

  // Fungsi untuk logout
  const logout = () => {
    setToken(null);
  };

  // Simulasi cek session saat aplikasi pertama kali dimuat
  useEffect(() => {
    const checkToken = async () => {
      // Simulasi delay cek async storage atau API
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };
    checkToken();
  }, []);

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

// Dummy default export to prevent Expo Router warning/crash
export default function AuthContextRoute() {
  return null;
}

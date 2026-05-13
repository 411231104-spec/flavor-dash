import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from './context/AuthContext';

// Komponen utama aplikasi yang membungkus seluruh routing
export default function RootLayout() {
  return (
    // Membungkus aplikasi dengan AuthProvider untuk state management authentication
    <AuthProvider>
      <Stack>
        {/* Konfigurasi Header untuk setiap halaman */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />
        <Stack.Screen name="detail" options={{ 
          title: 'Detail Pesanan',
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#F8FAFC',
          headerShadowVisible: false
        }} />
      </Stack>
    </AuthProvider>
  );
}

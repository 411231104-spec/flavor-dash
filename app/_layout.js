import { Stack } from 'expo-router';
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// ─────────────────────────────────────────────
// AppStack: Stack navigator yang menggunakan theme
// Dipisah agar bisa mengakses useTheme() di dalam ThemeProvider
// ─────────────────────────────────────────────
function AppStack() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.headerBg },
        headerTintColor: theme.headerText,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.bg },
        animation: 'slide_from_right',
      }}
    >
      {/* Halaman utama — header dihandle manual di dalam screen */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* Halaman login — tanpa header */}
      <Stack.Screen name="login" options={{ headerShown: false }} />

      {/* Detail Pesanan — header dari Stack (route protected) */}
      <Stack.Screen
        name="detail"
        options={{
          title: 'Detail Pesanan',
          headerStyle: { backgroundColor: theme.headerBg },
          headerTintColor: theme.headerText,
        }}
      />

      {/* Kamera — tanpa header, fullscreen */}
      <Stack.Screen name="camera" options={{ headerShown: false }} />

      {/* Maps — dengan header */}
      <Stack.Screen
        name="maps"
        options={{
          title: 'Lokasi Restoran',
          headerStyle: { backgroundColor: theme.headerBg },
          headerTintColor: theme.headerText,
        }}
      />
    </Stack>
  );
}

// ─────────────────────────────────────────────
// RootLayout: Entry point aplikasi
// ThemeProvider harus di luar AuthProvider agar useTheme bisa diakses AppStack
// ─────────────────────────────────────────────
export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppStack />
      </AuthProvider>
    </ThemeProvider>
  );
}

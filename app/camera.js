import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from './context/ThemeContext';

const { width } = Dimensions.get('window');

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [facing, setFacing] = useState('back');
  const cameraRef = useRef(null);
  const router = useRouter();
  const { theme } = useTheme();

  // ─── Ambil foto ───
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const result = await cameraRef.current.takePictureAsync({ quality: 0.7 });
        setPhoto(result.uri);
      } catch (e) {
        console.log('[Camera] Error taking picture:', e);
      }
    }
  };

  // ─── State: Permission belum diminta ───
  if (!permission) {
    return <View style={{ flex: 1, backgroundColor: theme.bg }} />;
  }

  // ─── State: Izin belum/tidak diberikan ───
  if (!permission.granted) {
    return (
      <SafeAreaView style={[styles.permissionContainer, { backgroundColor: theme.bg }]}>
        <StatusBar barStyle={theme.statusBar} />

        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <Text style={[styles.closeBtnText, { color: theme.subtext }]}>✕ Tutup</Text>
        </TouchableOpacity>

        <View style={[styles.permissionIconBox, { backgroundColor: theme.primarySoft }]}>
          <Text style={styles.permissionIconText}>📷</Text>
        </View>

        <Text style={[styles.permissionTitle, { color: theme.text }]}>
          Izin Kamera Diperlukan
        </Text>
        <Text style={[styles.permissionDesc, { color: theme.subtext }]}>
          Aplikasi membutuhkan akses kamera untuk mengambil foto bukti penerimaan pesanan Anda.
        </Text>

        <TouchableOpacity
          style={[styles.permissionBtn, { backgroundColor: theme.primary }]}
          onPress={requestPermission}
          activeOpacity={0.85}
        >
          <Text style={styles.permissionBtnText}>Izinkan Akses Kamera</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // ─── State: Foto sudah diambil — tampilkan preview ───
  if (photo) {
    return (
      <View style={styles.fullScreen}>
        <StatusBar barStyle="light-content" />
        <Image source={{ uri: photo }} style={styles.previewImage} resizeMode="cover" />

        {/* Overlay on top of preview */}
        <View style={StyleSheet.absoluteFillObject}>
          {/* Success Badge */}
          <SafeAreaView edges={['top']} style={styles.previewTop}>
            <View style={styles.successBadge}>
              <Text style={styles.successBadgeText}>✅ Foto Berhasil Diambil</Text>
            </View>
          </SafeAreaView>

          {/* Action Buttons di bawah */}
          <View style={styles.previewBottom}>
            <TouchableOpacity
              style={styles.retakeBtn}
              onPress={() => setPhoto(null)}
              activeOpacity={0.85}
            >
              <Text style={styles.retakeBtnText}>📷  Foto Ulang</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.usePhotoBtn, { backgroundColor: theme.primary }]}
              onPress={() => router.back()}
              activeOpacity={0.85}
            >
              <Text style={styles.usePhotoBtnText}>✓  Gunakan Foto Ini</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // ─── State: Kamera aktif ───
  return (
    <View style={styles.fullScreen}>
      <StatusBar barStyle="light-content" />
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.cameraOverlay}>
          {/* Top Bar */}
          <SafeAreaView edges={['top']}>
            <View style={styles.topBar}>
              <TouchableOpacity onPress={() => router.back()} style={styles.topBarBtn}>
                <Text style={styles.topBarBtnText}>✕</Text>
              </TouchableOpacity>
              <Text style={styles.topBarTitle}>Bukti Penerimaan</Text>
              <TouchableOpacity
                onPress={() => setFacing((f) => (f === 'back' ? 'front' : 'back'))}
                style={styles.topBarBtn}
              >
                <Text style={styles.topBarBtnText}>🔄</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          {/* Guide Frame di tengah */}
          <View style={styles.guideArea}>
            <View style={styles.guideFrame}>
              {/* Sudut-sudut frame */}
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
            </View>
            <Text style={styles.guideText}>Arahkan kamera ke pesanan</Text>
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomBar}>
            <View style={styles.bottomSpacer} />

            {/* Tombol capture */}
            <TouchableOpacity
              style={styles.captureBtn}
              onPress={takePicture}
              activeOpacity={0.8}
            >
              <View style={styles.captureRing}>
                <View style={styles.captureInner} />
              </View>
            </TouchableOpacity>

            <View style={styles.bottomSpacer} />
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },

  // ── Camera Overlay ──
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  topBarBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarBtnText: { fontSize: 18, color: '#fff' },
  topBarTitle: { color: '#fff', fontSize: 16, fontWeight: '600', letterSpacing: 0.3 },

  // ── Guide Frame ──
  guideArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  guideFrame: {
    width: width * 0.72,
    height: width * 0.72,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: '#FFFFFF',
    borderWidth: 3,
  },
  cornerTL: { top: 0, left: 0, borderBottomWidth: 0, borderRightWidth: 0, borderTopLeftRadius: 10 },
  cornerTR: { top: 0, right: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderTopRightRadius: 10 },
  cornerBL: { bottom: 0, left: 0, borderTopWidth: 0, borderRightWidth: 0, borderBottomLeftRadius: 10 },
  cornerBR: { bottom: 0, right: 0, borderTopWidth: 0, borderLeftWidth: 0, borderBottomRightRadius: 10 },
  guideText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '500',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 20,
    overflow: 'hidden',
  },

  // ── Bottom Capture Bar ──
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 48,
    paddingTop: 24,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  bottomSpacer: { width: 56 },
  captureBtn: { alignItems: 'center', justifyContent: 'center' },
  captureRing: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FFFFFF',
  },

  // ── Permission Screen ──
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '8%',
    gap: 16,
  },
  closeBtn: {
    position: 'absolute',
    top: '7%',
    left: '5%',
    padding: 8,
  },
  closeBtnText: { fontSize: 16, fontWeight: '600' },
  permissionIconBox: {
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: width * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionIconText: { fontSize: width * 0.13 },
  permissionTitle: { fontSize: width * 0.058, fontWeight: 'bold', textAlign: 'center' },
  permissionDesc: { fontSize: 15, textAlign: 'center', lineHeight: 24 },
  permissionBtn: {
    paddingHorizontal: 32,
    paddingVertical: 15,
    borderRadius: 14,
    marginTop: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  permissionBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  // ── Photo Preview ──
  previewImage: { flex: 1 },
  previewTop: {
    alignItems: 'center',
    paddingTop: 12,
  },
  successBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.92)',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 30,
  },
  successBadgeText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  previewBottom: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    gap: 12,
  },
  retakeBtn: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  retakeBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  usePhotoBtn: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  usePhotoBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});

import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/theme';
import Header from '@/components/common/Header';

export default function AppLayout() {
  
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack screenOptions={{ headerShown: false, animation: 'fade', }} />
    </SafeAreaProvider>
  );
}
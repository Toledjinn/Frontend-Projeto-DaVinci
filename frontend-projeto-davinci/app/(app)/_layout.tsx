import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/theme';
import Header from '@/components/common/Header';
import { useImmersiveBars } from '@/hooks/useImmersiveBars';

export default function AppLayout() {
  useImmersiveBars();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack screenOptions={{ headerShown: false, animation: 'fade', }} />
    </SafeAreaView>
  );
}
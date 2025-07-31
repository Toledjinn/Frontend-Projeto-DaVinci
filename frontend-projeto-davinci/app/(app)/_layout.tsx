import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { COLORS } from '@/constants/theme';
import Header from '@/components/common/Header';

export default function AppLayout() {
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Stack screenOptions={{ headerShown: false, animation: 'fade', }} />
    </SafeAreaView>
  );
}
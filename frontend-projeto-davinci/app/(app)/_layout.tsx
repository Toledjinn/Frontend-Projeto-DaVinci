import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import HeaderBackground from '../../src/assets/images/header.svg';
import { COLORS } from '@/constants/theme';

export default function AppLayout() {
  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <HeaderBackground
          width="100%"
          height="27%"
          preserveAspectRatio="xMidYMid slice"
        />
      </View>

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name="index" options={{ animation: 'fade' }} />
        <Stack.Screen name="notifications" options={{ animation: 'fade' }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

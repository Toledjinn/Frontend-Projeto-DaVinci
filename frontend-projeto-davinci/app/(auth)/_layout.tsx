import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import LogoCentral from '../../src/assets/images/logo-central.svg';
import LogoInferior from '../../src/assets/images/logo-inferior.svg';

export default function AuthLayout() {
  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <View style={styles.logoCentralWrapper}>
          <LogoCentral
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </View>
        <View style={styles.logoInferiorWrapper}>
          <LogoInferior
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </View>
      </View>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name="login" options={{ animation: 'fade' }} />
        <Stack.Screen name="forgot-password" options={{ animation: 'fade' }} />
        <Stack.Screen name="change-password" options={{ animation: 'fade' }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoCentralWrapper: {
    position: 'absolute',
    top: '4%',
    left: '22%',
    width: '65%',
    height: '38%',
  },
  logoInferiorWrapper: {
    position: 'absolute',
    bottom: 0,
    left: -1,
    width: '76%',
    height: '31%',
  },
});

import { Stack } from 'expo-router';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import LogoCentral from '../../src/assets/images/logo-central.svg';
import LogoInferior from '../../src/assets/images/logo-inferior.svg';

const AnimatedLogoInferiorView = Animated.createAnimatedComponent(View);
const AnimatedLogoCentralView = Animated.createAnimatedComponent(View);

export default function AuthLayout() {
  const { height } = useWindowDimensions();

  const logoCentralPosition = useSharedValue(height); 
  const logoInferiorOpacity = useSharedValue(0); 

  useEffect(() => {
    logoCentralPosition.value = withTiming(0, { duration: 2000 });
    logoInferiorOpacity.value = withDelay(2500, withTiming(1, { duration: 500 }));
  }, []);

  const animatedLogoCentralStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: logoCentralPosition.value }],
    };
  });

  const animatedLogoInferiorStyle = useAnimatedStyle(() => {
    return {
      opacity: logoInferiorOpacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <AnimatedLogoCentralView style={[styles.logoCentralWrapper, animatedLogoCentralStyle]}>
          <LogoCentral
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </AnimatedLogoCentralView>
        <AnimatedLogoInferiorView style={[styles.logoInferiorWrapper, animatedLogoInferiorStyle]}>
          <LogoInferior
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </AnimatedLogoInferiorView>
      </View>

      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' }, animation: 'fade' }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="change-password" />
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

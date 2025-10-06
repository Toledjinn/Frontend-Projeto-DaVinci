// Caminho do arquivo: frontend-projeto-davinci/src/components/common/PaintDripOverlay.tsx
import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

interface PaintDripOverlayProps {
  startAnimation: boolean;
  onAnimationComplete: () => void;
}

const PAINT_COLOR = '#FF9900'; // Um tom de laranja
const DRIP_DURATION = 1200; // Duração da animação de "escorrer"

export default function PaintDripOverlay({
  startAnimation,
  onAnimationComplete,
}: PaintDripOverlayProps) {
  const { height } = useWindowDimensions();
  const overlayY = useSharedValue(-height); // Começa totalmente fora da tela, acima

  useEffect(() => {
    if (startAnimation) {
      // 1. A tinta aparece instantaneamente
      overlayY.value = withTiming(0, { duration: 50 });

      // 2. A tinta "escorre" para baixo, saindo da tela
      overlayY.value = withDelay(
        200,
        withTiming(height, {
          duration: DRIP_DURATION,
          easing: Easing.bezier(0.45, 0.05, 0.55, 0.95), // Curva suave
        })
      );
      
      // 3. Informa que a animação terminou
      setTimeout(onAnimationComplete, DRIP_DURATION + 300);
    }
  }, [startAnimation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: overlayY.value }],
    };
  });

  return <Animated.View style={[styles.overlay, animatedStyle]} />;
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: PAINT_COLOR,
    zIndex: 10, // Garante que fique por cima de tudo
  },
});

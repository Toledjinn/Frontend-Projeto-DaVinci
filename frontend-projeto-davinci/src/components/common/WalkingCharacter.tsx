// Caminho do arquivo: frontend-projeto-davinci/src/components/common/WalkingCharacter.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

// MUDANÇA: Mudamos para o "balde2.svg" para um novo teste.
import Walk2 from '../../assets/characters/balde2.svg';

// Apenas um frame para o teste
const walkFrames = [Walk2];
const FRAME_COUNT = walkFrames.length;

interface WalkingCharacterProps {
  walkFrame: Animated.SharedValue<number>;
}

export default function WalkingCharacter({ walkFrame }: WalkingCharacterProps) {
  return (
    <View style={styles.container}>
      {walkFrames.map((FrameComponent, index) => {
        // A animação não vai "andar", mas vai garantir que o SVG seja visível.
        const animatedStyle = useAnimatedStyle(() => {
          const currentFrame = Math.floor(walkFrame.value) % FRAME_COUNT;
          return {
            opacity: currentFrame === index ? 1 : 0,
          };
        });

        return (
          <Animated.View key={index} style={[StyleSheet.absoluteFill, animatedStyle]}>
            {/* Garantimos que FrameComponent é válido antes de renderizar */}
            {FrameComponent && <FrameComponent width="100%" height="100%" />}
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});


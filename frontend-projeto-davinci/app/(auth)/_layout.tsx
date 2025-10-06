import { Stack } from 'expo-router';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

// 1. Importamos os SVGs e hooks novamente
import LogoCentral from '../../src/assets/images/logo-central.svg';
import LogoInferior from '../../src/assets/images/logo-inferior.svg';
import { useImmersiveBars } from '@/hooks/useImmersiveBars';

export default function AuthLayout() {
  useImmersiveBars();
  const { height } = useWindowDimensions();

  // Calcula a posição final do logo para garantir consistência
  const logoTopPosition = height * 0.04;

  return (
    <View style={styles.container}>
      {/* 2. Adicionamos os logos como um fundo estático */}
      {/* O `pointerEvents="none"` garante que eles não interfiram com os botões */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <View style={[styles.logoCentralWrapper, { top: logoTopPosition }]}>
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

      {/* 3. O Stack renderiza as telas (forgot-password, etc.) por cima dos logos */}
      <Stack screenOptions={{ 
          headerShown: false, 
          // O fundo transparente é a chave para que os logos do layout apareçam
          contentStyle: { backgroundColor: 'transparent' }, 
          animation: 'fade' 
      }}>
        {/* A tela de 'login' não está mais aqui, pois foi substituída pelo `index.tsx` */}
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="change-password" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // O fundo do container principal deve ser a cor de fundo do seu app
    backgroundColor: '#ffffff', 
  },
  logoCentralWrapper: {
    position: 'absolute',
    left: '22%',
    width: '65%',
    height: '38%',
    // Usamos a escala final da animação para que a aparência seja idêntica
    transform: [{ scale: 0.85 }], 
  },
  logoInferiorWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '76%',
    height: '31%',
  },
});


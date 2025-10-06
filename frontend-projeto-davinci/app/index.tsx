import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';

// Componentes e SVGs
import LogoCentral from '../src/assets/images/logo-central.svg';
import LogoInferior from '../src/assets/images/logo-inferior.svg';
import StyledInput from '../src/components/common/StyledInput';
import StyledButton from '../src/components/common/StyledButton';

// Estilos, hooks e utils (assumindo que os caminhos estão corretos)
import { styles as loginStyles } from '../src/screens/auth/LoginScreen.styles';
import { useImmersiveBars } from '../src/hooks/useImmersiveBars';
import { maskCPF } from '../src/utils/maskUtils';
import { validateCPF } from '../src/utils/cpfUtils';
import { validatePassword } from '../src/utils/passwordUtils';

// Esconde a splash nativa até que estejamos prontos
SplashScreen.hideAsync();

export default function UnifiedEntryScreen() {
  useImmersiveBars();
  const router = useRouter();
  const { height, width } = useWindowDimensions();

  // Estados do formulário
  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // --- VALORES DA ANIMAÇÃO ---
  // Posição inicial do logo no centro da tela
  const logoY = useSharedValue(height / 2 - (height * 0.38) / 2); 
  const logoScale = useSharedValue(1);

  // Posição do logo inferior (começa fora da tela)
  const logoInferiorX = useSharedValue(-width);
  
  // Opacidade dos elementos
  const logoInferiorOpacity = useSharedValue(0);
  const formOpacity = useSharedValue(0);
  const backgroundOpacity = useSharedValue(0);

  useEffect(() => {
    // --- SEQUÊNCIA DA NOVA ANIMAÇÃO ---
    
    // 1. O fundo e o logo inferior aparecem suavemente
    backgroundOpacity.value = withDelay(200, withTiming(1, { duration: 1000 }));
    logoInferiorOpacity.value = withDelay(500, withTiming(1, { duration: 1200 }));
    logoInferiorX.value = withDelay(500, withTiming(0, {
        duration: 1200,
        easing: Easing.out(Easing.cubic),
    }));
    
    // 2. O logo central move-se para a sua posição final (no topo)
    const logoFinalY = height * 0.04; // 4% do topo da tela
    logoY.value = withDelay(1800, withTiming(logoFinalY, {
        duration: 1000,
        easing: Easing.bezier(0.4, 0, 0.2, 1), // Curva suave de aceleração/desaceleração
    }));
    logoScale.value = withDelay(1800, withTiming(0.85, { // Diminui um pouco para se ajustar
        duration: 1000,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
    }));

    // 3. O formulário aparece assim que o logo começa a se mover
    formOpacity.value = withDelay(2200, withTiming(1, { duration: 600 }));

  }, []);

  // --- ESTILOS ANIMADOS ---
  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: logoY.value },
      { scale: logoScale.value }
    ],
  }));

  const animatedLogoInferiorStyle = useAnimatedStyle(() => ({
    opacity: logoInferiorOpacity.value,
    transform: [{ translateX: logoInferiorX.value }],
  }));
  
  const animatedFormStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
  }));
  
  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
  }));
  
  // Funções do formulário
  const handleLogin = () => {
    const isCpfValid = validateCPF(cpf);
    const isPasswordValid = validatePassword(password);
    if (isCpfValid && isPasswordValid) {
        Alert.alert('Sucesso', 'Login efetuado!');
        router.replace('/(app)/home');
    } else {
        if (!isCpfValid) setCpfError('CPF inválido.');
        if (!isPasswordValid) setPasswordError('Senha inválida.');
    }
  };

  return (
    <SafeAreaView style={loginStyles.safeArea}>
      {/* Elementos de fundo que aparecem primeiro */}
      <Animated.View style={[StyleSheet.absoluteFillObject, animatedBackgroundStyle]}>
          <Animated.View style={[styles.logoInferiorWrapper, animatedLogoInferiorStyle]}>
              <LogoInferior width="100%" height="100%" />
          </Animated.View>
      </Animated.View>

      {/* Logo Principal que se move */}
      <Animated.View style={[styles.logoCentralWrapper, animatedLogoStyle]}>
        <LogoCentral width="100%" height="100%" />
      </Animated.View>
      
      {/* Formulário de Login */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[loginStyles.container, { paddingTop: Math.min(height * 0.48, 380) }]}>
            <Animated.View style={[loginStyles.form, animatedFormStyle]}>
              <StyledInput label="CPF" iconName="user" placeholder="Digite seu CPF" keyboardType="numeric" value={cpf} onChangeText={(v) => setCpf(maskCPF(v))} maxLength={14} error={cpfError} />
              <StyledInput label="Senha" iconName="lock" placeholder="Digite sua senha" secureTextEntry value={password} onChangeText={setPassword} error={passwordError} />
              <TouchableOpacity style={loginStyles.forgotPasswordButton} onPress={() => router.push('/forgot-password')}>
                <Text style={loginStyles.forgotPasswordText}>RECUPERAR SENHA</Text>
              </TouchableOpacity>
              <StyledButton title="Entrar" style={loginStyles.loginButton} onPress={handleLogin} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos para posicionamento dos logos
const styles = StyleSheet.create({
  logoCentralWrapper: {
    position: 'absolute',
    // O posicionamento horizontal é fixo, apenas o Y (vertical) é animado
    left: '22%', 
    width: '65%',
    height: '38%', 
  },
  logoInferiorWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '76%',
    height: '31%',
  },
});



import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView, 
  useWindowDimensions
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { useRouter, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { styles } from './LoginScreen.styles';
import StyledInput from '@/components/common/StyledInput';
import StyledButton from '@/components/common/StyledButton';
import { validateCPF } from '@/utils/cpfUtils';
import { maskCPF } from '@/utils/maskUtils';
import { validatePassword } from '@/utils/passwordUtils';
import { useUIStore } from '@/state/uiStore';

const AnimatedFormView = Animated.createAnimatedComponent(View);

export default function LoginScreen() {
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const params = useLocalSearchParams();
  const { height } = useWindowDimensions();
  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const formOpacity = useSharedValue(params.skipAnimation ? 1 : 0);
  const paddingTop = Math.min(height * 0.48, 380);

  useFocusEffect(
    React.useCallback(() => {
      setHeaderConfig({
        visible: false,
      });
    }, [])
  );

  useEffect(() => {
     if (!params.skipAnimation) {
      formOpacity.value = withDelay(2500, withTiming(1, { duration: 500 }));
    }
  }, []);

  const animatedFormStyle = useAnimatedStyle(() => {
    return {
      opacity: formOpacity.value,
    };
  });

  const handleCpfChange = (value: string) => {
    const maskedValue = maskCPF(value);
    setCpf(maskedValue);
    if (cpfError) setCpfError(null);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (passwordError) setPasswordError(null);
  };

  const handleLogin = () => {
    setCpfError(null);
    setPasswordError(null);

    const isCpfValid = validateCPF(cpf);
    const isPasswordValid = validatePassword(password);
    router.replace('/(app)/home'); 

    let hasError = false;
    if (!isCpfValid) {
      setCpfError('Por favor, insira um CPF válido.');
      hasError = true;
    }

    if (!isPasswordValid) {
      setPasswordError('A senha deve ter no mínimo 8 caracteres.');
      hasError = true;
    }

    if (!hasError) {
      Alert.alert('Sucesso', 'Login efetuado!'); 
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.container, { paddingTop }]}>
            <AnimatedFormView style={[styles.form, animatedFormStyle]}>
              <View style={styles.inputWrapper}>
                <StyledInput
                  label="CPF"
                  iconName="user"
                  placeholder="Digite seu CPF"
                  keyboardType="numeric"
                  value={cpf}
                  onChangeText={handleCpfChange}
                  maxLength={14}
                  error={cpfError}
                  reserveErrorSpace={true}
                />
              </View>

              <View style={styles.inputWrapper}>
                <StyledInput
                  label="Senha"
                  iconName="lock"
                  placeholder="Digite sua senha"
                  secureTextEntry
                  value={password}
                  onChangeText={handlePasswordChange}
                  error={passwordError}
                  reserveErrorSpace={true}
                />
              </View>

              <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={() => router.push('/forgot-password')}
              >
                <Text style={styles.forgotPasswordText}>
                  ESQUECI MINHA SENHA
                </Text>
              </TouchableOpacity>

              <StyledButton
                title="Entrar"
                style={styles.loginButton}
                onPress={handleLogin}
              />
            </AnimatedFormView>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}

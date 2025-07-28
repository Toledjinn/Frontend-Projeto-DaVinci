import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { styles } from './LoginScreen.styles';
import StyledInput from '@/components/common/StyledInput';
import StyledButton from '@/components/common/StyledButton';
import { maskCPF, validateCPF } from '@/utils/cpfUtils';
import { validatePassword } from '@/utils/passwordUtils';

const AnimatedFormView = Animated.createAnimatedComponent(View);

export default function LoginScreen() {
  const router = useRouter();
  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  
  const formOpacity = useSharedValue(0);

  useEffect(() => {
    formOpacity.value = withDelay(2500, withTiming(1, { duration: 500 }));
  }, []);

  
  const animatedFormStyle = useAnimatedStyle(() => {
    return {
      opacity: formOpacity.value,
    };
  });


  const handleCpfChange = (value: string) => {
    const maskedValue = maskCPF(value);
    setCpf(maskedValue);
    if (maskedValue.length === 14) {
      if (!validateCPF(maskedValue)) {
        setCpfError('CPF inválido');
      } else {
        setCpfError(null);
      }
    } else {
      setCpfError(null);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(null);
  };

  const handleLogin = () => {
    const isCpfValid = validateCPF(cpf);
    const isPasswordValid = validatePassword(password);

    if (!isCpfValid) {
      setCpfError('Por favor, insira um CPF válido.');
    }

    if (!isPasswordValid) {
      setPasswordError('A senha deve ter no mínimo 8 caracteres.');
    }

    if (isCpfValid && isPasswordValid) {
      Alert.alert('Sucesso', 'Login efetuado!');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <AnimatedFormView style={[styles.form, animatedFormStyle]}>
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

              <StyledInput
                label="Senha"
                iconName="lock"
                placeholder="Digite sua senha"
                secureTextEntry
                value={password}
                onChangeText={handlePasswordChange}
                error={passwordError}
              />

              <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={() => router.push('/forgot-password')}
              >
                <Text style={styles.forgotPasswordText}>
                  ESQUECI MINHA SENHA
                </Text>
              </TouchableOpacity>

              <StyledButton title="Entrar" onPress={handleLogin} />
            </AnimatedFormView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

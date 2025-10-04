// /src/screens/auth/AuthScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect, useLocalSearchParams } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { loginStyles, changeStyles, forgotStyles } from './AuthScreen.styles';

// componentes/utilitários existentes (inalterados)
import StyledInput from '@/components/common/StyledInput';
import StyledButton from '@/components/common/StyledButton';
import StyledDatePicker from '@/components/common/StyledDatePicker';
import { validateCPF } from '@/utils/cpfUtils';
import { maskCPF } from '@/utils/maskUtils';
import { validatePassword } from '@/utils/passwordUtils';
import { useUIStore } from '@/state/uiStore';

const AnimatedFormView = Animated.createAnimatedComponent(View);

type Mode = 'login' | 'forgot' | 'change';
type AuthScreenProps = { mode: Mode };

function LoginPanel() {
  const router = useRouter();
  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);
  const params = useLocalSearchParams() as { skipAnimation?: string };
  const { height } = useWindowDimensions();

  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const formOpacity = useSharedValue(params?.skipAnimation ? 1 : 0);
  const paddingTop = Math.min(height * 0.48, 380);

  useFocusEffect(
    React.useCallback(() => {
      // 🔧 header atual: sempre informe o layout
      // login não mostra header
      setHeaderConfig({ layout: 'page', visible: false, showBackground: false });
    }, [setHeaderConfig])
  );

  useEffect(() => {
    if (!params?.skipAnimation) {
      formOpacity.value = withDelay(2500, withTiming(1, { duration: 500 }));
    } else {
      formOpacity.value = 1;
    }
  }, []);

  const animatedFormStyle = useAnimatedStyle(() => ({ opacity: formOpacity.value }));

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
    // setCpfError(null);
    // setPasswordError(null);

    // const isCpfValid = validateCPF(cpf);
    // const isPasswordValid = validatePassword(password);

    // if (!isCpfValid) setCpfError('Por favor, insira um CPF válido.');
    // if (!isPasswordValid) setPasswordError('A senha deve ter no mínimo 8 caracteres.');
    // if (!isCpfValid || !isPasswordValid) return;

    Alert.alert('Sucesso', 'Login efetuado!');
    router.replace('/(app)/home');
  };

  return (
    <SafeAreaView style={loginStyles.safeArea}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" bounces={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[loginStyles.container, { paddingTop }]}>
            <AnimatedFormView style={[loginStyles.form, animatedFormStyle]}>
              <View style={loginStyles.inputWrapper}>
                <StyledInput
                  label="CPF"
                  iconName="user"
                  placeholder="Digite seu CPF"
                  keyboardType="numeric"
                  value={cpf}
                  onChangeText={handleCpfChange}
                  maxLength={14}
                  error={cpfError}
                  reserveErrorSpace
                />
              </View>

              <View style={loginStyles.inputWrapper}>
                <StyledInput
                  label="Senha"
                  iconName="lock"
                  placeholder="Digite sua senha"
                  secureTextEntry
                  value={password}
                  onChangeText={handlePasswordChange}
                  error={passwordError}
                  reserveErrorSpace
                />
              </View>

              <TouchableOpacity
                style={loginStyles.forgotPasswordButton}
                onPress={() => router.push('/forgot-password')}
              >
                <Text style={loginStyles.forgotPasswordText}>RECUPERAR SENHA</Text>
              </TouchableOpacity>

              <StyledButton title="Entrar" style={loginStyles.loginButton} onPress={handleLogin} />
            </AnimatedFormView>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}

function ForgotPanel() {
  const router = useRouter();
  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);
  const { height } = useWindowDimensions();

  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [birthDateError, setBirthDateError] = useState<string | null>(null);

  const paddingTop = Math.min(height * 0.48, 380);

  useFocusEffect(
    React.useCallback(() => {
      // 🔧 header atual: só botão de voltar (sem centro/sino)
      setHeaderConfig({
        layout: 'page',
        visible: true,
        showBackground: false,
        showNotificationIcon: false,
      });
    }, [setHeaderConfig])
  );

  const handleCpfChange = (value: string) => {
    const maskedValue = maskCPF(value);
    setCpf(maskedValue);
    if (cpfError) setCpfError(null);
  };

  const handleRecoverPassword = () => {
    const isCpfValid = validateCPF(cpf);
    const isBirthDateValid = birthDate !== null;

    setCpfError(null);
    setBirthDateError(null);

    if (!isCpfValid) setCpfError('Por favor, insira um CPF válido.');
    if (!isBirthDateValid) setBirthDateError('Por favor, selecione a data de nascimento.');

    if (isCpfValid && isBirthDateValid) {
      Alert.alert(
        'Validação concluída!',
        'Por segurança, é necessário alterar sua senha. Ela deve conter no mínimo 8 caracteres.'
      );
      router.push('/change-password');
    }
  };

  return (
    <SafeAreaView style={forgotStyles.safeArea}>
      <KeyboardAvoidingView
        style={forgotStyles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[forgotStyles.container, { paddingTop }]}>
            <View style={forgotStyles.form}>
              <View style={forgotStyles.inputWrapper}>
                <StyledInput
                  label="CPF"
                  iconName="user"
                  placeholder="Digite seu CPF"
                  keyboardType="numeric"
                  value={cpf}
                  onChangeText={handleCpfChange}
                  maxLength={14}
                  error={cpfError}
                  reserveErrorSpace
                />
              </View>

              <View style={forgotStyles.inputWrapper}>
                <StyledDatePicker
                  label="Data de Nascimento"
                  value={birthDate}
                  onChange={(date) => {
                    setBirthDate(date);
                    if (birthDateError) setBirthDateError(null);
                  }}
                  error={birthDateError}
                  reserveErrorSpace
                />
              </View>

              <StyledButton
                title="Recuperar Senha"
                onPress={handleRecoverPassword}
                style={forgotStyles.recoverButton}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ChangePanel() {
  const router = useRouter();
  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);
  const { height } = useWindowDimensions();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const paddingTop = Math.min(height * 0.48, 380);

  useFocusEffect(
    React.useCallback(() => {
      // 🔧 header atual: só botão de voltar (sem centro/sino)
      setHeaderConfig({
        layout: 'page',
        visible: true,
        showBackground: false,
        showNotificationIcon: false,
      });
    }, [setHeaderConfig])
  );

  const handlePasswordChange = (value: string) => {
    setNewPassword(value);
    if (passwordError) setPasswordError(null);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (confirmPasswordError) setConfirmPasswordError(null);
  };

  const handleChangePassword = () => {
    setPasswordError(null);
    setConfirmPasswordError(null);

    const isPasswordValid = validatePassword(newPassword);
    if (!isPasswordValid) {
      setPasswordError('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    const doPasswordsMatch = newPassword === confirmPassword;
    if (!doPasswordsMatch) {
      setConfirmPasswordError('As senhas não coincidem.');
      return;
    }

    Alert.alert('Sucesso', 'Sua senha foi alterada! Efetue o login novamente');
    router.push({ pathname: '/login', params: { skipAnimation: 'true' } });
  };

  return (
    <SafeAreaView style={changeStyles.safeArea}>
      <KeyboardAvoidingView
        style={changeStyles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[changeStyles.container, { paddingTop }]}>
            <View style={changeStyles.form}>
              <View style={changeStyles.inputWrapper}>
                <StyledInput
                  label="Nova senha"
                  iconName="lock"
                  placeholder="Nova senha"
                  secureTextEntry
                  value={newPassword}
                  onChangeText={handlePasswordChange}
                  error={passwordError}
                  reserveErrorSpace
                />
              </View>

              <View style={changeStyles.inputWrapper}>
                <StyledInput
                  label="Confirme a senha"
                  iconName="lock"
                  placeholder="Confirme a senha"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                  error={confirmPasswordError}
                  reserveErrorSpace
                />
              </View>

              <StyledButton
                title="Alterar Senha"
                onPress={handleChangePassword}
                style={changeStyles.changeButton}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default function AuthScreen({ mode }: AuthScreenProps) {
  if (mode === 'login') return <LoginPanel />;
  if (mode === 'forgot') return <ForgotPanel />;
  return <ChangePanel />;
}

import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  useWindowDimensions
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { styles } from './ForgotPasswordScreen.styles';
import StyledInput from '@/components/common/StyledInput';
import StyledButton from '@/components/common/StyledButton';
import { validateCPF } from '@/utils/cpfUtils';
import { maskCPF } from '@/utils/maskUtils';
import { useUIStore } from '@/state/uiStore';
import StyledDatePicker from '@/components/common/StyledDatePicker';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const { height } = useWindowDimensions();
  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [birthDateError, setBirthDateError] = useState<string | null>(null);
  const paddingTop = Math.min(height * 0.48, 380);

   useFocusEffect(
    React.useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page',
        showBackground: false,
        showPageHeaderElements: false,
        showNotificationIcon: false,
      });
    }, [])
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
    router.push('/change-password');

    let hasError = false;
    if (!isCpfValid) {
      setCpfError('Por favor, insira um CPF válido.');
      hasError = true;
    }

    if (!isBirthDateValid) {
      setBirthDateError('Por favor, selecione a data de nascimento.');
      hasError = true;
    }

    if (!hasError) {
      Alert.alert(
        'Validação concluída!',
        'Por segurança, é necessário alterar sua senha. Ela deve conter no mínimo 8 caracteres.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.container, { paddingTop }]}>
            <View style={styles.form}>
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
                <StyledDatePicker
                  label="Data de Nascimento"
                  value={birthDate}
                  onChange={(date) => {
                    setBirthDate(date);
                    if (birthDateError) setBirthDateError(null);
                  }}
                  error={birthDateError}
                  reserveErrorSpace={true}
                />
              </View>

              <StyledButton
                title="Recuperar Senha"
                onPress={handleRecoverPassword}
                style={styles.recoverButton}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

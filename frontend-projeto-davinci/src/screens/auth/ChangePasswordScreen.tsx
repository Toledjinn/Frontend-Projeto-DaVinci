import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { styles } from './ChangePasswordScreen.styles';
import StyledInput from '@/components/common/StyledInput';
import StyledButton from '@/components/common/StyledButton';
import { validatePassword } from '@/utils/passwordUtils';
import { useUIStore } from '@/state/uiStore';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  const { height } = useWindowDimensions();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(
    null
  );

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
    router.push({ pathname: '/login', params: { skipAnimation: 'true' }});

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
    router.push({ pathname: '/login', params: { skipAnimation: 'true' }});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.container, { paddingTop: height * 0.48 }]}>
            <View style={styles.form}>
              <View style={styles.inputWrapper}>
                <StyledInput
                  label="Nova senha"
                  iconName="lock"
                  placeholder="Nova senha"
                  secureTextEntry
                  value={newPassword}
                  onChangeText={handlePasswordChange}
                  error={passwordError}
                  reserveErrorSpace={true}
                />
              </View>

              <View style={styles.inputWrapper}>
                <StyledInput
                  label="Confirme a senha"
                  iconName="lock"
                  placeholder="Confirme a senha"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                  error={confirmPasswordError}
                  reserveErrorSpace={true}
                />
              </View>

              <StyledButton
                title="Alterar Senha"
                onPress={handleChangePassword}
                style={styles.changeButton}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

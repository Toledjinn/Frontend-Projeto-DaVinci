import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './ChangePasswordScreen.styles';
import StyledInput from '@/components/common/StyledInput';
import StyledButton from '@/components/common/StyledButton';
import { validatePassword } from '@/utils/passwordUtils';
import Header from '@/components/common/Header';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(
    null
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
    const isPasswordValid = validatePassword(newPassword);
    const doPasswordsMatch = newPassword === confirmPassword;


    if (!isPasswordValid) {
      setPasswordError('A senha deve ter no mínimo 8 caracteres.');
      return; 
    }

    if (!doPasswordsMatch) {
      setConfirmPasswordError('As senhas não coincidem.');
      return;
    }

    Alert.alert('Sucesso', 'Sua senha foi alterada! Efetue o login novamente');
    router.push('/login'); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header showBackButton={true} />
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.form}>
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

            <StyledButton title="Alterar Senha" onPress={handleChangePassword} />

          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </SafeAreaView>
);
}
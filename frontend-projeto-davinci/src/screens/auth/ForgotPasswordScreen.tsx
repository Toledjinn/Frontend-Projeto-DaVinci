import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './ForgotPasswordScreen.styles';
import StyledInput from '@/components/common/StyledInput';
import StyledButton from '@/components/common/StyledButton';
import { maskCPF, validateCPF } from '@/utils/cpfUtils';
import { COLORS } from '@/constants/theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [birthDateText, setBirthDateText] = useState('');
  const [birthDateError, setBirthDateError] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);

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

  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = selectedDate.toLocaleDateString('pt-BR');
      setBirthDateText(formattedDate);
      setBirthDateError(null);
    }
  };

  const handleRecoverPassword = () => {
    const isCpfValid = validateCPF(cpf);
    const isBirthDateValid = birthDateText !== '';

    if (!isCpfValid) {
      setCpfError('Por favor, insira um CPF válido.');
    }

    if (!isBirthDateValid) {
      setBirthDateError('Por favor, selecione a data de nascimento.');
    }

    if (isCpfValid && isBirthDateValid) {
      Alert.alert(
        'Validação concluída!',
        'Por segurança, é necessário alterar sua senha. Ela deve conter no mínimo 8 caracteres.'
      );
      router.push('/change-password');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StyledButton
        title="Voltar"
        onPress={() => router.back()}
        style={styles.backButton}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.form}>
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

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Data de Nascimento</Text>
                <TouchableOpacity
                  onPress={() => setShowPicker(true)}
                  style={[
                    styles.dateInputContainer,
                    { borderColor: birthDateError ? COLORS.red : COLORS.gray_200 },
                  ]}
                >
                  <Icon
                    name="calendar"
                    size={24}
                    color={COLORS.gray_400}
                    style={styles.icon}
                  />
                  <Text style={birthDateText ? styles.dateText : styles.placeholder}>
                    {birthDateText || '--/--/----'}
                  </Text>
                </TouchableOpacity>
                {birthDateError ? (
                  <Text style={styles.errorText}>{birthDateError}</Text>
                ) : (
                  <View style={styles.errorPlaceholder} />
                )}
              </View>

              <StyledButton
                title="Recuperar Senha"
                onPress={handleRecoverPassword}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>

        {showPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

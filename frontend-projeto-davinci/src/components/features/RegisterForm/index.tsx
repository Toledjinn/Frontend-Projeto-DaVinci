import React, { useState, useRef } from 'react';
import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { styles } from './styles';
import StyledInput from '@/components/common/StyledInput';
import StyledDatePicker from '@/components/common/StyledDatePicker';
import StyledPicker, { PickerItem } from '@/components/common/StyledPicker';
import { maskCPF, maskPhone, maskCep } from '@/utils/maskUtils';
import { validateCPF } from '@/utils/cpfUtils';

const genderItems: PickerItem[] = [
  { label: 'Feminino', value: 'female' },
  { label: 'Masculino', value: 'male' },
  { label: 'Outro', value: 'other' },
];

const maritalStatusItems: PickerItem[] = [
  { label: 'Solteiro(a)', value: 'single' },
  { label: 'Casado(a)', value: 'married' },
  { label: 'Divorciado(a)', value: 'divorced' },
  { label: 'Viúvo(a)', value: 'widowed' },
];

export default function RegisterForm() {
  const { userType } = useLocalSearchParams<{ userType: 'admin' | 'dentist' | 'patient' }>();
  const numberInputRef = useRef<TextInput>(null);

  const [name, setName] = useState('');
  const [gender, setGender] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [maritalStatus, setMaritalStatus] = useState<string | null>(null);
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState<string | null>(null);
  const [nationality, setNationality] = useState('');
  const [naturalness, setNaturalness] = useState('');
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [isCepLoading, setIsCepLoading] = useState(false);
  const [isAddressFetched, setIsAddressFetched] = useState(false);

  const [cro, setCro] = useState('');

  const handleCpfChange = (value: string) => {
    if (cpfError) {
        setCpfError(null);
    }
    setCpf(maskCPF(value));
  };

  const handleCpfBlur = () => {
    if (cpf && !validateCPF(cpf)) {
        setCpfError('CPF inválido');
    }
  };

  const handlePhoneChange = (value: string) => setPhone(maskPhone(value));

  const handleCepChange = async (value: string) => {
    const maskedValue = maskCep(value);
    setCep(maskedValue);

    const numericValue = maskedValue.replace(/\D/g, '');

    if (isAddressFetched && numericValue.length < 8) {
      setIsAddressFetched(false);
      setAddress('');
      setNeighborhood('');
      setCity('');
      setState(null);
    }

    if (numericValue.length === 8) {
      setIsCepLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${numericValue}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setAddress(data.logradouro);
          setNeighborhood(data.bairro);
          setCity(data.localidade);
          setState(data.uf);
          setIsAddressFetched(true);
          numberInputRef.current?.focus();
        } else {
          console.log('CEP não encontrado.');
          setAddress('');
          setNeighborhood('');
          setCity('');
          setState(null);
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      } finally {
        setIsCepLoading(false);
      }
    }
  };

  const renderAdminForm = () => (
    <>
      <View style={styles.inputWrapper}>
        <StyledInput label="Nome Completo" iconName="user" value={name} onChangeText={setName} placeholder="Digite o nome completo" reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledPicker label="Gênero" iconName="users" selectedValue={gender} onValueChange={setGender} items={genderItems} reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledDatePicker label="Data de Nascimento" value={birthDate} onChange={setBirthDate} reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledPicker label="Estado Civil" iconName="heart" selectedValue={maritalStatus} onValueChange={setMaritalStatus} items={maritalStatusItems} reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledInput label="CPF" iconName="file-text" value={cpf} onChangeText={handleCpfChange} onBlur={handleCpfBlur} placeholder="___.___.___-__" keyboardType="numeric" maxLength={14} error={cpfError} reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledInput label="Telefone" iconName="phone" value={phone} onChangeText={handlePhoneChange} placeholder="(__) _____-____" keyboardType="phone-pad" maxLength={15} reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledInput label="E-mail" iconName="mail" value={email} onChangeText={setEmail} placeholder="example@gmail.com" keyboardType="email-address" autoCapitalize="none" reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledInput label="CEP" iconName="map-pin" value={cep} onChangeText={handleCepChange} placeholder="_____-___" keyboardType="numeric" maxLength={9} reserveErrorSpace />
        {isCepLoading && <ActivityIndicator size="small" style={styles.cepLoading} />}
      </View>
      <View style={styles.inputWrapper}>
        <StyledInput label="Endereço" iconName="map" value={address} onChangeText={setAddress} editable={isAddressFetched} reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledInput label="Bairro" iconName="map" value={neighborhood} onChangeText={setNeighborhood} editable={isAddressFetched} reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledInput ref={numberInputRef} label="Número" iconName="hash" value={number} onChangeText={setNumber} keyboardType="numeric" editable={isAddressFetched} reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledInput label="Complemento" iconName="plus" value={complement} onChangeText={setComplement} editable={isAddressFetched} reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledInput label="Cidade" iconName="map" value={city} onChangeText={setCity} editable={isAddressFetched} reserveErrorSpace />
      </View>
       <View style={styles.inputWrapper}>
        <StyledInput label="Estado" iconName="map" value={state || ''} onChangeText={(val) => setState(val)} editable={isAddressFetched} reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledInput label="Nacionalidade" iconName="globe" value={nationality} onChangeText={setNationality} reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledInput label="Naturalidade" iconName="map-pin" value={naturalness} onChangeText={setNaturalness} reserveErrorSpace />
      </View>
    </>
  );

  const renderDentistForm = () => (
     <View style={styles.inputWrapper}>
        <StyledInput label="CRO" iconName="award" placeholder="0000 - DF" value={cro} onChangeText={setCro} reserveErrorSpace />
     </View>
  );

  const renderForm = () => {
    switch (userType) {
      case 'admin':
        return renderAdminForm();
      case 'dentist':
        return renderDentistForm();
      default:
        return <Text>Tipo de usuário inválido.</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {renderForm()}
    </View>
  );
}
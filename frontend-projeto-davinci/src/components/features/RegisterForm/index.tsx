import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import StyledInput from '@/components/common/StyledInput';
import StyledDatePicker from '@/components/common/StyledDatePicker';
import StyledPicker, { PickerItem } from '@/components/common/StyledPicker';
import StyledSwitch from '@/components/common/StyledSwitch';
import StyledMultiSelect, { MultiSelectItem } from '@/components/common/StyledMultiSelect';
import { maskCPF, maskPhone, maskCep } from '@/utils/maskUtils';
import { validateCPF } from '@/utils/cpfUtils';
import { COLORS } from '@/constants/theme';
import { findUserById, UserProfile } from '@/data/mockUsers';

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

const roleItems: PickerItem[] = [
  { label: 'Administrador', value: 'administrator' },
  { label: 'Secretária', value: 'secretary' },
  { label: 'Auxiliar de Consultório', value: 'assistant' },
];

const ufItems: PickerItem[] = [
    { label: 'Acre', value: 'AC' }, { label: 'Alagoas', value: 'AL' },
    { label: 'Amapá', value: 'AP' }, { label: 'Amazonas', value: 'AM' },
    { label: 'Bahia', value: 'BA' }, { label: 'Ceará', value: 'CE' },
    { label: 'Distrito Federal', value: 'DF' }, { label: 'Espírito Santo', value: 'ES' },
    { label: 'Goiás', value: 'GO' }, { label: 'Maranhão', value: 'MA' },
    { label: 'Mato Grosso', value: 'MT' }, { label: 'Mato Grosso do Sul', value: 'MS' },
    { label: 'Minas Gerais', value: 'MG' }, { label: 'Pará', value: 'PA' },
    { label: 'Paraíba', value: 'PB' }, { label: 'Paraná', value: 'PR' },
    { label: 'Pernambuco', value: 'PE' }, { label: 'Piauí', value: 'PI' },
    { label: 'Rio de Janeiro', value: 'RJ' }, { label: 'Rio Grande do Norte', value: 'RN' },
    { label: 'Rio Grande do Sul', value: 'RS' }, { label: 'Rondônia', value: 'RO' },
    { label: 'Roraima', value: 'RR' }, { label: 'Santa Catarina', value: 'SC' },
    { label: 'São Paulo', value: 'SP' }, { label: 'Sergipe', value: 'SE' },
    { label: 'Tocantins', value: 'TO' }
];

const specialtyItems: MultiSelectItem[] = [
    { label: 'Ortodontia', value: 'orthodontics' },
    { label: 'Periodontia', value: 'periodontics' },
    { label: 'Implantodontia', value: 'implantodontics' },
    { label: 'Prótese', value: 'prosthesis' },
    { label: 'Odontopediatria', value: 'pediatric_dentistry' },
    { label: 'Clínica Geral', value: 'general_clinic' },
    { label: 'Harmonização Facial', value: 'facial_harmonization' },
    { label: 'Endodontia', value: 'endodontics' },
];

export default function RegisterForm() {
  const { userType, userId } = useLocalSearchParams<{ userType: string, userId?: string }>();
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
  const [role, setRole] = useState<string | null>(null);
  
  const [cro, setCro] = useState('');
  const [croUf, setCroUf] = useState<string | null>(null);
  const [specialties, setSpecialties] = useState<string[]>([]);

  const [hasAllergies, setHasAllergies] = useState(false);
  const [allergies, setAllergies] = useState([{ id: 1, value: '' }]);

    useEffect(() => {
    if (userId) {
      const userData = findUserById(userId);
      if (userData) {
        const getDetail = (label: string) => userData.details.find(d => d.label.toLowerCase() === label.toLowerCase())?.value || '';
        
        setName(userData.name);
        
        const genderValue = getDetail('gênero').toLowerCase();
        const genderItem = genderItems.find(item => item.label.toLowerCase() === genderValue);
        setGender(genderItem ? genderItem.value : null);

        const dobString = getDetail('data de nascimento');
        if (dobString) {
            const parts = dobString.split('/');
            setBirthDate(new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0])));
        }
        
        const maritalStatusValue = getDetail('estado civil');
        const maritalStatusItem = maritalStatusItems.find(item => item.label.startsWith(maritalStatusValue));
        setMaritalStatus(maritalStatusItem ? maritalStatusItem.value : null);
        setCpf(getDetail('cpf'));
        setPhone(getDetail('telefone'));
        setEmail(getDetail('e-mail'));
        setNationality(getDetail('nacionalidade'));
        setNaturalness(getDetail('naturalidade'));
        setAddress(getDetail('endereço'));
        setCep(getDetail('cep'));
        setNeighborhood(getDetail('bairro'));
        setNumber(getDetail('número'));
        setComplement(getDetail('complemento'));
        const cityStateString = getDetail('cidade / estado');
        if (cityStateString.includes(' / ')) {
            const [cityVal, stateVal] = cityStateString.split(' / ');
            setCity(cityVal);
            setState(stateVal);
        }

        if (userData.type === 'admin') {
            const roleValue = getDetail('cargo');
            const roleItem = roleItems.find(item => item.label === roleValue);
            setRole(roleItem ? roleItem.value : null);
        }

        if (userData.type === 'dentist') {
            const croValue = getDetail('cro');
            if (croValue.includes(' - ')) {
                const [croNum, croUfVal] = croValue.split(' - ');
                setCro(croNum);
                setCroUf(croUfVal);
            }
            const specialtyValueMap: { [key: string]: string } = {
                'Ortodontia': 'orthodontics', 'Periodontia': 'periodontics', 'Implantodontia': 'implantodontics',
                'Prótese': 'prosthesis', 'Odontopediatria': 'pediatric_dentistry', 'Clínica Geral': 'general_clinic',
                'Harmonização Facial': 'facial_harmonization', 'Endodontia': 'endodontics',
            };
            setSpecialties(userData.specialties?.map(s => specialtyValueMap[s]).filter(Boolean) as string[] || []);
        }
        
        if (userData.type === 'patient' && userData.allergies && userData.allergies.length > 0) {
            setHasAllergies(true);
            setAllergies(userData.allergies.map((a, i) => ({ id: Date.now() + i, value: a })));
        }
      }
    }
  }, [userId]);

  const handleAllergyChange = (text: string, id: number) => {
    const newAllergies = allergies.map(allergy =>
      allergy.id === id ? { ...allergy, value: text } : allergy
    );
    setAllergies(newAllergies);
  };

  const addAllergyInput = () => {
    setAllergies([...allergies, { id: Date.now(), value: '' }]);
  };

  const removeAllergyInput = (id: number) => {
    setAllergies(allergies.filter(allergy => allergy.id !== id));
  };

  const handleCpfChange = (value: string) => {
    if (cpfError) setCpfError(null);
    setCpf(maskCPF(value));
  };

  const handleCpfBlur = () => {
    if (cpf && !validateCPF(cpf)) setCpfError('CPF inválido');
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

  const renderCommonFields = () => (
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
        <StyledInput label="Endereço" iconName="map" value={address} onChangeText={setAddress} editable={!isAddressFetched} reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledInput label="Bairro" iconName="map" value={neighborhood} onChangeText={setNeighborhood} editable={!isAddressFetched} reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledInput ref={numberInputRef} label="Número" iconName="hash" value={number} onChangeText={setNumber} keyboardType="numeric" reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledInput label="Complemento" iconName="plus" value={complement} onChangeText={setComplement} reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledInput label="Cidade" iconName="map" value={city} onChangeText={setCity} editable={!isAddressFetched} reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledInput label="Estado" iconName="map" value={state || ''} onChangeText={(val) => setState(val)} editable={!isAddressFetched} reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledInput label="Nacionalidade" iconName="globe" value={nationality} onChangeText={setNationality} reserveErrorSpace />
      </View>
      <View style={styles.inputWrapper}>
        <StyledInput label="Naturalidade" iconName="map-pin" value={naturalness} onChangeText={setNaturalness} reserveErrorSpace />
      </View>
    </>
  );
  
  const renderAdminForm = () => (
    <>
      {renderCommonFields()}
      <View style={styles.inputWrapper}>
        <StyledPicker
          label="Cargo"
          iconName="briefcase"
          selectedValue={role}
          onValueChange={setRole}
          items={roleItems}
          reserveErrorSpace
        />
      </View>
    </>
  );

  const renderPatientForm = () => (
    <>
      {renderCommonFields()}
      <StyledSwitch
        label="Possui alergias?"
        value={hasAllergies}
        onValueChange={setHasAllergies}
      />
      {hasAllergies && (
        <>
          {allergies.map((allergy, index) => (
            <View key={allergy.id} style={styles.allergyInputRow}>
              <View style={{ flex: 1 }}>
                <StyledInput
                  label={index === 0 ? 'Alergia' : ''}
                  iconName="alert-triangle"
                  value={allergy.value}
                  onChangeText={(text) => handleAllergyChange(text, allergy.id)}
                  placeholder="Ex: Poeira, Lactose"
                />
              </View>
              {allergies.length > 1 && (
                <TouchableOpacity onPress={() => removeAllergyInput(allergy.id)} style={styles.removeButton}>
                  <Feather name="x-circle" size={24} color={COLORS.red} />
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TouchableOpacity onPress={addAllergyInput} style={styles.addButton}>
            <Feather name="plus" size={20} color={COLORS.white} />
            <Text style={styles.addButtonText}>Adicionar mais alergias</Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
  
  const renderDentistForm = () => (
    <>
        {renderCommonFields()}
        <View style={styles.row}>
            <View style={styles.croInput}>
                <StyledInput label="CRO" iconName="award" value={cro} onChangeText={setCro} keyboardType="numeric" reserveErrorSpace />
            </View>
            <View style={styles.ufPicker}>
                <StyledPicker label="UF" iconName="map-pin" selectedValue={croUf} onValueChange={setCroUf} items={ufItems} reserveErrorSpace />
            </View>
        </View>
        <View style={styles.inputWrapper}>
            <StyledMultiSelect
                label="Especialidades"
                iconName="star"
                items={specialtyItems}
                selectedItems={specialties}
                onSelectionChange={setSpecialties}
                placeholder="Selecione as especialidades"
                reserveErrorSpace
            />
        </View>
    </>
  );

  const renderForm = () => {
    switch (userType) {
      case 'admin':
        return renderAdminForm();
      case 'dentist':
        return renderDentistForm(); 
      case 'patient':
        return renderPatientForm();
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
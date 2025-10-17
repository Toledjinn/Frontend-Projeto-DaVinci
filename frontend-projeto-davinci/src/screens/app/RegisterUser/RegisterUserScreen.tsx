import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  LayoutChangeEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import { styles } from './RegisterUserScreen.styles';
import { useUIStore } from '@/state/uiStore';
import ScreenFooter from '@/components/common/ScreenFooter';
import StyledInput from '@/components/common/StyledInput';
import StyledDatePicker from '@/components/common/StyledDatePicker';
import StyledPicker, { PickerItem } from '@/components/common/StyledPicker';
import StyledSwitch from '@/components/common/StyledSwitch';
import StyledMultiSelect, { MultiSelectItem } from '@/components/common/StyledMultiSelect';

import { COLORS } from '@/constants/theme';
import { maskCPF, maskPhone, maskCep } from '@/utils/maskUtils';
import { validateCPF } from '@/utils/cpfUtils';
import { useUsers } from '@/hooks/useUsers';
import type { UserProfile } from '@/data/mockUsers';

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
  { label: 'AC', value: 'AC' }, { label: 'AL', value: 'AL' },
  { label: 'AP', value: 'AP' }, { label: 'AM', value: 'AM' },
  { label: 'BA', value: 'BA' }, { label: 'CE', value: 'CE' },
  { label: 'DF', value: 'DF' }, { label: 'ES', value: 'ES' },
  { label: 'GO', value: 'GO' }, { label: 'MA', value: 'MA' },
  { label: 'MT', value: 'MT' }, { label: 'MS', value: 'MS' },
  { label: 'MG', value: 'MG' }, { label: 'PA', value: 'PA' },
  { label: 'PB', value: 'PB' }, { label: 'PR', value: 'PR' },
  { label: 'PE', value: 'PE' }, { label: 'PI', value: 'PI' },
  { label: 'RJ', value: 'RJ' }, { label: 'RN', value: 'RN' },
  { label: 'RS', value: 'RS' }, { label: 'RO', value: 'RO' },
  { label: 'RR', value: 'RR' }, { label: 'SC', value: 'SC' },
  { label: 'SP', value: 'SP' }, { label: 'SE', value: 'SE' },
  { label: 'TO', value: 'TO' },
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

const getTitle = (userType?: string, isEditing?: boolean) => {
  const action = isEditing ? 'Editar' : 'Cadastrar';
  switch (userType) {
    case 'admin':   return `${action} Administrador`;
    case 'dentist': return `${action} Dentista`;
    case 'patient': return `${action} Paciente`;
    default:        return `${action} Usuário`;
  }
};

export default function RegisterUserScreen() {
  const router = useRouter();
  const setHeaderConfig = useUIStore((s) => s.setHeaderConfig);
  const clearPhoto = useUIStore((s) => s.setRegisterPhotoUri);
  const registerPhotoUri = useUIStore((s) => s.registerPhotoUri);
  const { height } = useWindowDimensions();

  const headerHeight = height * 0.19;
  const bodyOffset = headerHeight + 8;

  const [footerHeight, setFooterHeight] = useState<number>(88); 
  const onFooterLayout = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0) setFooterHeight(h);
  };

  const { userType, userId } = useLocalSearchParams<{ userType: string; userId?: string }>();
  const isEditing = !!userId;

  const { save, list } = useUsers();
  const existingUser = useMemo(
    () => (userId ? list.find((u) => String(u.id) === String(userId)) : undefined),
    [list, userId]
  );
  const existingPhotoUri = existingUser?.photoUri ?? null;

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
  const [allergies, setAllergies] = useState<{ id: number; value: string }[]>([{ id: 1, value: '' }]);

  useFocusEffect(
    useCallback(() => {
      clearPhoto(null);

      setHeaderConfig({
        layout: 'register',
        pageTitle: getTitle(userType, isEditing),
        showNotificationIcon: false,
        showBackground: true,
        userPhotoUri: isEditing ? existingPhotoUri : null,
      });
    }, [userType, isEditing, existingPhotoUri, setHeaderConfig, clearPhoto])
  );

  useEffect(() => {
    if (!existingUser) return;

    const getDetail = (label: string) =>
      existingUser.details.find((d: any) => d.label.toLowerCase() === label.toLowerCase())?.value || '';

    setName(existingUser.name);

    const genderValue = getDetail('gênero').toLowerCase();
    const genderItem = genderItems.find((i) => i.label.toLowerCase() === genderValue);
    setGender(genderItem?.value ?? null);

    const dobString = getDetail('data de nascimento');
    if (dobString) {
      const [d, m, y] = dobString.split('/');
      setBirthDate(new Date(parseInt(y), parseInt(m) - 1, parseInt(d)));
    }

    const maritalValue = getDetail('estado civil').toLowerCase();
    const maritalItem = maritalStatusItems.find((i) => i.label.toLowerCase().startsWith(maritalValue));
    setMaritalStatus(maritalItem?.value ?? null);

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
    if (cityStateString && cityStateString.includes(' / ')) {
      const [cityVal, stateVal] = cityStateString.split(' / ');
      setCity(cityVal);
      setState(stateVal);
    } else {
      setCity(cityStateString || '');
      setState(null);
    }

    if (existingUser.type === 'admin') {
      const roleValue = getDetail('cargo');
      const roleItem = roleItems.find((i) => i.label === roleValue);
      setRole(roleItem?.value ?? null);
    }

    if (existingUser.type === 'dentist') {
      const croValue = getDetail('cro');
      if (croValue && croValue.includes(' - ')) {
        const [croNum, croUfVal] = croValue.split(' - ');
        setCro(croNum);
        setCroUf(croUfVal);
      }
      const map: Record<string, string> = {
        Ortodontia: 'orthodontics',
        Periodontia: 'periodontics',
        Implantodontia: 'implantodontics',
        Prótese: 'prosthesis',
        Odontopediatria: 'pediatric_dentistry',
        'Clínica Geral': 'general_clinic',
        'Harmonização Facial': 'facial_harmonization',
        Endodontia: 'endodontics',
      };
      setSpecialties(
        (existingUser.specialties?.map((s: string) => map[s]).filter(Boolean) as string[]) || []
      );
    }

    if (existingUser.type === 'patient') {
      const arr = existingUser.allergies?.length
        ? existingUser.allergies.map((a: string, i: number) => ({ id: Date.now() + i, value: a }))
        : [{ id: 1, value: '' }];
      setHasAllergies(!!existingUser.allergies?.length);
      setAllergies(arr);
    }
  }, [existingUser]);

  function buildPayload(): UserProfile & { photoUri?: string | null } {
    const existing = existingUser;
    const id = existing?.id ?? String(Date.now());

    const genderLabel = genderItems.find((i) => i.value === gender)?.label ?? '';
    const maritalLabel = maritalStatusItems.find((i) => i.value === maritalStatus)?.label ?? '';

    const dob = birthDate
      ? `${String(birthDate.getDate()).padStart(2, '0')}/${String(birthDate.getMonth() + 1).padStart(2, '0')}/${birthDate.getFullYear()}`
      : '';

    const details = [
      { label: 'Gênero', value: genderLabel },
      { label: 'Data de Nascimento', value: dob },
      { label: 'Estado Civil', value: maritalLabel },
      { label: 'CPF', value: cpf },
      { label: 'Telefone', value: phone },
      { label: 'E-mail', value: email },
      { label: 'Nacionalidade', value: nationality },
      { label: 'Naturalidade', value: naturalness },
      { label: 'Endereço', value: address },
      { label: 'CEP', value: cep },
      { label: 'Bairro', value: neighborhood },
      { label: 'Número', value: number },
      { label: 'Complemento', value: complement },
      { label: 'Cidade / Estado', value: state ? `${city} / ${state}` : city },
    ];

    if (userType === 'admin') {
      const roleLabel = roleItems.find((i) => i.value === role)?.label ?? '';
      details.push({ label: 'Cargo', value: roleLabel });
    }

    if (userType === 'dentist') {
      details.push({ label: 'CRO', value: cro && croUf ? `${cro} - ${croUf}` : '' });
    }

    const rawCpf = (cpf || '').replace(/\D/g, '');
    const password =
      birthDate
        ? `${String(birthDate.getDate()).padStart(2, '0')}${String(birthDate.getMonth() + 1).padStart(2, '0')}${birthDate.getFullYear()}`
        : '';

    const authType: 'adm' | 'dentista' | 'paciente' =
      userType === 'admin' ? 'adm' : userType === 'dentist' ? 'dentista' : 'paciente';

    const base: any = {
      id,
      name,
      type: userType === 'admin' ? 'admin' : userType === 'dentist' ? 'dentist' : 'patient',
      details,
      photoUri: registerPhotoUri ?? existing?.photoUri ?? null,
      authType,
      login: rawCpf,
      password,
    };

    if (userType === 'patient') {
      base.allergies = hasAllergies ? allergies.map((a) => a.value).filter(Boolean) : [];
    }
    if (userType === 'dentist') {
      base.specialties = specialties?.length ? specialties : [];
    }

    return base as UserProfile & { photoUri?: string | null };
  }

  const handleCancel = () => router.back();

  const handleSave = () => {
    const payload = buildPayload();
    console.log('REGISTER payload.photoUri =>', payload.photoUri);
    save(payload);
    useUIStore.getState().setRegisterPhotoUri(null);
    router.back();
  };

  const handleAllergyChange = (text: string, id: number) => {
    setAllergies((prev) => prev.map((a) => (a.id === id ? { ...a, value: text } : a)));
  };
  const addAllergyInput = () => setAllergies((prev) => [...prev, { id: Date.now(), value: '' }]);
  const removeAllergyInput = (id: number) => setAllergies((prev) => prev.filter((a) => a.id !== id));

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
      try {
        setIsCepLoading(true);
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
      } catch (e) {
        console.error('Erro ao buscar CEP:', e);
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
        <StyledPicker label="Cargo" iconName="briefcase" selectedValue={role} onValueChange={setRole} items={roleItems} reserveErrorSpace />
      </View>
    </>
  );

  const renderPatientForm = () => (
    <>
      {renderCommonFields()}
      <StyledSwitch label="Possui alergias?" value={hasAllergies} onValueChange={setHasAllergies} />
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
      case 'admin':   return renderAdminForm();
      case 'dentist': return renderDentistForm();
      case 'patient': return renderPatientForm();
      default:        return <Text>Tipo de usuário inválido.</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <ScrollView
          style={[styles.bodyScroll, { marginTop: bodyOffset }]}
          contentContainerStyle={[styles.bodyContent, { paddingBottom: footerHeight + 16 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>{renderForm()}</View>
        </ScrollView>

        <View onLayout={onFooterLayout}>
          <ScreenFooter
            buttons={[
              { title: 'Cancelar', onPress: handleCancel, variant: 'secondary' },
              { title: isEditing ? 'Salvar' : 'Cadastrar', onPress: handleSave, variant: 'primary' },
            ]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

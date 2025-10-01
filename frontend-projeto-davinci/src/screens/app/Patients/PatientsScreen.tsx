import React, { useState, useMemo, useCallback } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { styles } from './PatientsScreen.styles';
import { useUIStore } from '@/state/uiStore';
import Paciente from '@/assets/characters/chefinho.svg'; 
import UserList from '@/components/features/UserList';
import ScreenFooter from '@/components/common/ScreenFooter';
import SearchAndFilterBar from '@/components/features/SearchAndFilterBar';
import { getUsers as getPatients, UserProfile } from '@/data/mockUsers';
import { getAppointmentsByPatientId, getAllAppointments } from '@/data/mockAppointments';
import PatientFilterModal from '@/components/features/PatientFilterModal';
import { ALL_SPECIALTIES } from '@/data/mockSpecialties';

const MOCK_PATIENTS = getPatients('patient');
const ALL_APPOINTMENTS = getAllAppointments();

const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/');
  return new Date(Number(year), Number(month) - 1, Number(day));
};

export default function PatientsScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.204;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [allergyFilter, setAllergyFilter] = useState<'all' | 'yes' | 'no'>('all');

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Pacientes',
        CharacterSvg: require('@/assets/characters/chefinho.svg').default,
        showNotificationIcon: true,
      });
    }, [])
  );
  
  const handleRegisterPress = () => {
    router.push({
      pathname: '/register',
      params: { userType: 'patient' },
    });
  };

  const handleApplyFilter = (filters: any) => {
    setAllergyFilter(filters.allergy);
    setSelectedGenders(filters.genders);
    setSelectedSpecialties(filters.specialties);
  };

  const filteredPatients = useMemo(() => {
    const filtered = MOCK_PATIENTS
      .filter(user => {
        if (allergyFilter === 'yes') return user.allergies && user.allergies.length > 0;
        if (allergyFilter === 'no') return !user.allergies || user.allergies.length === 0;
        return true;
      })
      .filter(user => {
        if (selectedGenders.length === 0) return true;
        const genderDetail = user.details.find(d => d.label === 'Gênero');
        return genderDetail && selectedGenders.includes(genderDetail.value);
      })
      .filter(user => {
        if (selectedSpecialties.length === 0) return true;
        const patientAppointments = ALL_APPOINTMENTS.filter(a => a.patientId === user.id);
        const patientSpecialties = [...new Set(patientAppointments.map(a => a.specialty))];
        return patientSpecialties.some(spec => selectedSpecialties.includes(spec));
      })
      .filter(user => {
        return user.name.toLowerCase().includes(searchQuery.toLowerCase());
      });

    const now = new Date();
    now.setHours(0, 0, 0, 0); 
    
    return filtered.map(user => {
      const appointments = getAppointmentsByPatientId(user.id);
      let detailLabel: string | undefined = undefined;
      let detailValue: string | undefined = 'Nenhuma consulta';

      const futureAppointments = appointments
        .filter(appt => appt.status === 'agendada' && parseDate(appt.date) >= now)
        .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());

      if (futureAppointments.length > 0) {
        detailLabel = 'Próxima consulta:';
        detailValue = futureAppointments[0].date;
      } else {
        const pastAppointments = appointments
          .filter(appt => appt.status === 'realizada')
          .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
        
        if (pastAppointments.length > 0) {
          detailLabel = 'Última consulta:';
          detailValue = pastAppointments[0].date;
        }
      }

      return {
          ...user,
          detailLabel: detailLabel,
          detailValue: detailValue,
          hasAllergies: user.allergies && user.allergies.length > 0,
      };
    });
  }, [searchQuery, allergyFilter, selectedGenders, selectedSpecialties]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{flex: 1}}>
        <View style={[styles.contentWrapper, { paddingTop: headerHeight }]}>
          <SearchAndFilterBar
            searchPlaceholder="Digite o nome do paciente"
            onSearchChange={setSearchQuery}
            onFilterPress={() => setFilterModalVisible(true)}
          />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContentContainer}
            keyboardShouldPersistTaps="handled"
          >
            <UserList data={filteredPatients} />
          </ScrollView>
        </View>
        <ScreenFooter
          buttons={[
            {
              title: "Cadastrar Paciente",
              onPress: handleRegisterPress,
              variant: 'secondary',  
            }
          ]}
        />
      </View>
      <PatientFilterModal
        visible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilter}
        specialtyOptions={ALL_SPECIALTIES}
        initialFilters={{
          genders: selectedGenders,
          specialties: selectedSpecialties,
          allergy: allergyFilter,
        }}
      />
    </SafeAreaView>
  );
}
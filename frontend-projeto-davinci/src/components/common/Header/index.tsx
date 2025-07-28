import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import NotificacaoIcon from '@/assets/icons/notificacao.svg';
import FotoPerfil from '@/assets/images/FotoPerfil.svg';
import { COLORS } from '@/constants/theme';

type HeaderProps = {
  showBackButton?: boolean;
  showNotifications?: boolean;
  screenName?: string;
  isHomeScreen?: boolean;
  userName?: string;
  hasNewNotification?: boolean;
};

export default function Header({
  showBackButton = false,
  showNotifications = false,
  screenName,
  isHomeScreen = false,
  userName = 'Gratone',
  hasNewNotification = true,
}: HeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        {isHomeScreen && (
          <View style={styles.profileImageContainer}>
            <FotoPerfil width={80} height={80} />
          </View>
        )}
        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Feather name="chevron-left" size={40} color={COLORS.secondary} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.centerSection}>
        {isHomeScreen ? (
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.userName}>Olá, {userName}</Text>
          </View>
        ) : (
          <Text style={styles.userName}>{screenName}</Text>
        )}
      </View>

      <View style={styles.rightSection}>
        {showNotifications && (
          <TouchableOpacity style={styles.notificationContainer} onPress={() => router.push('/(app)/notifications') }>
            <NotificacaoIcon width={50} height={35} />
            {hasNewNotification && <View style={styles.notificationDot} />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

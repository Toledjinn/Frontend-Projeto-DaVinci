import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { getHeaderStyles } from './styles';
import NotificacaoIcon from '@/assets/icons/notificacao.svg';
import FotoPerfil from '@/assets/images/FotoPerfil.svg';
import HeaderBackground from '@/assets/images/header.svg';
import PageHeader from '@/components/common/PageHeader';
import ProfileHeader from '@/components/common/ProfileHeader'; 
import { COLORS } from '@/constants/theme';
import { useUIStore } from '@/state/uiStore';

export default function Header() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const styles = getHeaderStyles(height);

  const { headerConfig } = useUIStore();
  const {
    visible,
    layout,
    showPageHeaderElements,
    pageTitle,
    CharacterSvg,
    showNotificationIcon,
    showBackground,
    userName,
    UserImageSvg,
  } = headerConfig;

  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.wrapper, { height: headerHeight }]} pointerEvents="box-none">
      {showBackground && (
        <View style={styles.backgroundContainer} pointerEvents="none">
          <HeaderBackground
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
          />
        </View>
      )}

      {layout === 'page' && showPageHeaderElements && CharacterSvg && (
        <PageHeader CharacterSvg={CharacterSvg} title={pageTitle} />
      )}
      {layout === 'profile' && UserImageSvg && userName && (
        <ProfileHeader UserImageSvg={UserImageSvg} userName={userName} />
      )}

      <View style={styles.headerContainer}>
        <View style={styles.leftSection}>
          {layout === 'home' && (
            <TouchableOpacity onPress={() => router.push('/(app)/profile')} activeOpacity={1}>
              <View style={styles.profileImageContainer}>
                <FotoPerfil width={height * 0.1} height={height * 0.1} />
              </View>
            </TouchableOpacity>
          )}
          {(layout === 'page' || layout === 'profile') && (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={1}>
              <Feather name="chevron-left" size={40} color={COLORS.secondary} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.centerSection}>
          {layout === 'home' && (
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.userName}>Olá, {userName || 'Gratone'}</Text>
            </View>
          )}
        </View>

        <View style={styles.rightSection}>
          {showNotificationIcon && (
            <TouchableOpacity style={styles.notificationContainer} onPress={() => router.push('/(app)/notifications')} activeOpacity={1}>
              <NotificacaoIcon height={height * 0.042} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

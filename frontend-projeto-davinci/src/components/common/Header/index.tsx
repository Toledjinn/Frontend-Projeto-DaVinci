import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { getHeaderStyles } from './styles';
import NotificacaoIcon from '@/assets/icons/notificacao.svg';
import FotoPerfil from '@/assets/images/FotoPerfil.svg';
import HeaderBackground from '@/assets/images/header.svg';
import HeaderHomeBackground from '@/assets/images/header2.svg';
import PageHeader from '@/components/common/PageHeader';
import ProfileHeader from '@/components/common/ProfileImage';
import ImagePickerHeader from '@/components/common/ImagePickerHeader';
import ShoppingCartIcon from '@/assets/icons/shoppingcart.svg';

import { COLORS } from '@/constants/theme';
import { useUIStore as useUIStoreHeader } from '@/state/uiStore';
import { badge } from '@/ui/badgePresets';

export default function Header() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const styles = getHeaderStyles(height);

  const { headerConfig } = useUIStoreHeader();
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
    riskLevel,
    pageHeaderBadgeVariant, 
  } = headerConfig;

  const headerHeight = layout === 'home' ? height * 0.226 : height * 0.32;

  const notificationCircle = height * 0.085;
  const border = 3;
  const iconPadding = Math.round(height * 0.008);
  const iconSize = notificationCircle - border * 2 - iconPadding * 2;

  if (!visible) return null;

   const headerBadgePreset =
    pageHeaderBadgeVariant === 'store' ? badge.headerStore : badge.header;

  return (
    <View style={[styles.wrapper, { height: headerHeight }]} pointerEvents="box-none">
      {showBackground && (
        <View style={styles.backgroundContainer} pointerEvents="none">
          {layout === 'home' ? (
            <HeaderHomeBackground width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
          ) : (
            <HeaderBackground width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
          )}
        </View>
      )}

      {(layout === 'page' || layout === 'loja') &&
        showPageHeaderElements &&
        CharacterSvg && (
          <PageHeader
            CharacterSvg={CharacterSvg}
            title={pageTitle}
            badgePreset={headerBadgePreset}
          />
      )}

      {layout === 'profile' && UserImageSvg && userName && (
        <ProfileHeader UserImageSvg={UserImageSvg} userName={userName} riskLevel={riskLevel} />
      )}

      {layout === 'register' && <ImagePickerHeader title={pageTitle} />}

      <View style={styles.headerContainer}>
        <View className="leftSection" style={styles.leftSection}>
          {layout === 'home' && (
            <TouchableOpacity onPress={() => router.push('/(app)/profile')} activeOpacity={1}>
              <View style={styles.profileImageContainer}>
                <FotoPerfil width="100%" height="100%" />
              </View>
            </TouchableOpacity>
          )}
          {(layout === 'page' || layout === 'profile' || layout === 'register' || layout === 'loja') && (
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
          {showNotificationIcon && layout !== 'loja' && (
            <TouchableOpacity
              style={[styles.notificationContainer, { padding: iconPadding }]}
              onPress={() => router.push('/(app)/notifications')}
              activeOpacity={1}
            >
              <NotificacaoIcon width={iconSize} height={iconSize} preserveAspectRatio="xMidYMid meet" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          )}
          {layout === 'loja' && (
            <TouchableOpacity
              style={[styles.notificationContainer, { padding: iconPadding }]}
              onPress={() => router.push('/(app)/carrinho')}
              activeOpacity={1}
            >
              <ShoppingCartIcon width={iconSize} height={iconSize} preserveAspectRatio="xMidYMid meet" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, Alert } from 'react-native';
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
import { useUsers } from '@/hooks/useUsers';
import { badge } from '@/ui/badgePresets';
import LogoBadge from '@/components/common/LogoBadge';
import UserPlaceholder from '@/assets/icons/user-placeholder.svg';

type RiskLower = 'baixo' | 'moderado' | 'alto' | 'a_definir';

function normalizeRiskToLower(
  lvl?: string
): RiskLower | undefined {
  if (!lvl) return undefined;
  const norm = String(lvl).toLowerCase().replace(/\s+/g, '_');
  if (norm === 'baixo' || norm === 'moderado' || norm === 'alto') return norm as RiskLower;
  if (norm === 'a_definir') return 'a_definir';
  return 'a_definir';
}

export default function Header() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const styles = getHeaderStyles(height);

  const { headerConfig } = useUIStoreHeader();
  const { deleteById } = useUsers();

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
    userPhotoUri,
    riskLevel,               
    pageHeaderBadgeVariant,
    showDeleteIcon,
    userId,
  } = headerConfig as typeof headerConfig & {
    showDeleteIcon?: boolean;
    userId?: string;
    userPhotoUri?: string | null;
  };

  const headerHeight = layout === 'home' ? height * 0.226 : height * 0.29;
  const notificationCircle = height * 0.12;
  const border = 3;
  const iconSize = notificationCircle - border * 2;

  if (!visible) return null;

  const headerBadgePreset =
    pageHeaderBadgeVariant === 'store' ? badge.headerStore : badge.header;

  const handleDeleteUser = () => {
    if (!userId) {
      Alert.alert('Erro', 'ID do usuário não encontrado.');
      return;
    }
    Alert.alert(
      'Excluir usuário',
      `Tem certeza que deseja excluir ${userName || 'o usuário'}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteById(userId);
              Alert.alert('Usuário excluído com sucesso!');
              router.back();
            } catch (err) {
              console.error(err);
              Alert.alert('Erro', 'Não foi possível excluir o usuário.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const riskLower = normalizeRiskToLower(riskLevel);

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

      {layout === 'profile' && userName && (
        <ProfileHeader
          UserImageSvg={UserImageSvg || UserPlaceholder}
          userName={userName}
          riskLevel={riskLower as any}
          photoUri={userPhotoUri ?? null}
        />
      )}

      {layout === 'register' && <ImagePickerHeader title={pageTitle} />}

      <View style={styles.headerContainer}>
        <View style={styles.leftSection}>
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
          {layout === 'profile' && showDeleteIcon && (
            <TouchableOpacity onPress={handleDeleteUser} activeOpacity={0.8} style={{ paddingHorizontal: 8 }}>
              <Feather name="trash-2" size={32} color={COLORS.secondary} />
            </TouchableOpacity>
          )}

          {showNotificationIcon && layout !== 'loja' && (
            <TouchableOpacity
              style={[styles.notificationContainer]}
              onPress={() => router.push('/(app)/notifications')}
              activeOpacity={1}
            >
              <LogoBadge {...badge.headerNotif(NotificacaoIcon)} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          )}

          {layout === 'loja' && (
            <TouchableOpacity
              style={[styles.cartContainer]}
              onPress={() => router.push('/(app)/carrinho')}
              activeOpacity={1}
            >
              <ShoppingCartIcon width={iconSize} height={iconSize} style={styles.notificationIcon} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

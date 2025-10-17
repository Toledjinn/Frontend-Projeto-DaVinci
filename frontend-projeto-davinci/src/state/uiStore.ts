import { create } from 'zustand';
import { SvgProps } from 'react-native-svg';
import React from 'react';

type HeaderConfig = {
  visible: boolean;
  layout: 'home' | 'page' | 'profile' | 'register' | 'loja';
  showPageHeaderElements: boolean;
  pageTitle: string;
  CharacterSvg: React.FC<SvgProps> | null;
  showNotificationIcon: boolean;
  showBackground: boolean;

  userName?: string;
  UserImageSvg?: React.FC<SvgProps> | null;
  userPhotoUri?: string | null;

  riskLevel?: 'baixo' | 'moderado' | 'alto' | 'a_definir';
  pageHeaderBadgeVariant?: 'default' | 'store';

  showDeleteIcon?: boolean; 
  userId?: string;         
};

type UIState = {
  headerConfig: HeaderConfig;
  setHeaderConfig: (config: Partial<HeaderConfig>) => void;

  registerPhotoUri: string | null;
  setRegisterPhotoUri: (uri: string | null) => void;
};

const initialConfig: HeaderConfig = {
  visible: true,
  layout: 'home',
  showPageHeaderElements: false,
  pageTitle: '',
  CharacterSvg: null,
  showNotificationIcon: true,
  showBackground: true,

  userName: '',
  UserImageSvg: null,
  userPhotoUri: null,

  riskLevel: undefined,
  pageHeaderBadgeVariant: 'default',

  showDeleteIcon: false,
  userId: undefined,
};

export const useUIStore = create<UIState>((set) => ({
  headerConfig: initialConfig,

  setHeaderConfig: (config) =>
    set(() => ({
      headerConfig: { ...initialConfig, ...config },
    })),

  registerPhotoUri: null,
  setRegisterPhotoUri: (uri) => set({ registerPhotoUri: uri }),
}));

import { create } from 'zustand';
import { SvgProps } from 'react-native-svg';
import React from 'react';

type HeaderConfig = {
  visible: boolean;
  layout: 'home' | 'page' | 'profile' | 'register'; 
  showPageHeaderElements: boolean;
  pageTitle: string;
  CharacterSvg: React.FC<SvgProps> | null;
  showNotificationIcon: boolean;
  showBackground: boolean;
  userName?: string;
  UserImageSvg?: React.FC<SvgProps> | null;
  riskLevel?: 'baixo' | 'moderado' | 'alto';
};

type UIState = {
  headerConfig: HeaderConfig;
  setHeaderConfig: (config: Partial<HeaderConfig>) => void;
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
};

export const useUIStore = create<UIState>((set) => ({
  headerConfig: initialConfig,
  setHeaderConfig: (config) =>
    set(() => ({
      headerConfig: { ...initialConfig, ...config },
    })),
}));

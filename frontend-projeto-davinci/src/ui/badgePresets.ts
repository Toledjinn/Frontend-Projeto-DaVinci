import React from 'react';
import { Dimensions, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import type LogoBadge from '@/components/common/LogoBadge';

export type LogoBadgeProps = React.ComponentProps<typeof LogoBadge>;

export type FullBadgePreset = Pick<
  LogoBadgeProps,
  'CharacterSvg' | 'diameter' | 'borderWidth' | 'inset' | 'contentPercent' | 'style' | 'backgroundColor'
>;

const getScreenWidth = () => Dimensions.get('window').width;
const getScreenHeight = () => Dimensions.get('window').height;

const shadowSoft: ViewStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
};

export const badge = {
  header: (CharacterSvg: React.FC<SvgProps>): FullBadgePreset => {
    const width = getScreenWidth();
    return {
      CharacterSvg,
      diameter: width * 0.3073,
      borderWidth: 3,
      inset: 0,
      contentPercent: 85,
      style: {},
      backgroundColor: undefined,
    };
  },

  button: (CharacterSvg: React.FC<SvgProps>): FullBadgePreset => {
    const width = getScreenWidth();
    const ideal = width * 0.22;
    const diameter = Math.round(Math.min(100, Math.max(76, ideal)));
    return {
      CharacterSvg,
      diameter,
      borderWidth: 3,
      inset: 0,
      contentPercent: 60,
      style: shadowSoft,
      backgroundColor: undefined,
    };
  },

  store: (CharacterSvg: React.FC<SvgProps>): FullBadgePreset => {
    const width = getScreenWidth();
    const ideal = width * 0.22;
    const diameter = Math.round(Math.min(100, Math.max(76, ideal)));
    return {
      CharacterSvg,
      diameter,
      borderWidth: 3,
      inset: 0,
      contentPercent: 60,
      style: shadowSoft,
      backgroundColor: undefined,
    };
  },

  headerStore: (CharacterSvg: React.FC<SvgProps>): FullBadgePreset => {
    const width = getScreenWidth();
    return {
      CharacterSvg,
      diameter: width * 0.3073,
      borderWidth: 3,
      inset: 0,
      contentPercent: 60,
      style: {},
      backgroundColor: undefined,
    };
  },

  headerNotif: (CharacterSvg: React.FC<SvgProps>): FullBadgePreset => {
    const h = getScreenHeight();
    const notificationCircle = h * 0.085;
    const border = 3;
    const iconPadding = Math.round(h * 0.008);

    return {
      CharacterSvg,
      diameter: notificationCircle,
      borderWidth: 0,                    
      inset: border + iconPadding,       
      contentPercent: 100,               
      style: {},                        
      backgroundColor: 'transparent',    
    };
  },
} as const;

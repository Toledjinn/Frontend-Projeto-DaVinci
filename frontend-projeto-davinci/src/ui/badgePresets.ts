import React from 'react';
import { Dimensions, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import type LogoBadge from '@/components/common/LogoBadge';

export type LogoBadgeProps = React.ComponentProps<typeof LogoBadge>;

export type FullBadgePreset = Pick<
  LogoBadgeProps,
  'CharacterSvg' | 'diameter' | 'borderWidth' | 'inset' | 'contentPercent' | 'style'
>;

const getScreenWidth = () => Dimensions.get('window').width;

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
    };
  },

  storeHeader: (CharacterSvg: React.FC<SvgProps>): FullBadgePreset => {
    const width = getScreenWidth();
    const ideal = width * 0.22;
    const clamped = Math.min(92, Math.max(76, ideal));
    return {
      CharacterSvg,
      diameter: width * 0.3073,
      borderWidth: 3,
      inset: 0,
      contentPercent: 80,
      style: shadowSoft,
    };
  },

  storeButton: (CharacterSvg: React.FC<SvgProps>): FullBadgePreset => {
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
    };
  },

  educationalButton: (CharacterSvg: React.FC<SvgProps>): FullBadgePreset => {
    const width = getScreenWidth();
    const ideal = width * 0.22;
    const diameter = Math.round(Math.min(100, Math.max(76, ideal)));
    return {
      CharacterSvg,
      diameter,
      borderWidth: 3,
      inset: 0,
      contentPercent: 75,   
      style: shadowSoft,
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
    };
  },
} as const;

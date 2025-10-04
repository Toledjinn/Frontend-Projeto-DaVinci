import React from 'react';
import { Dimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';

export type FullBadgePreset = {
  CharacterSvg: React.FC<SvgProps>;
  diameter: number;
  borderWidth: number;
  inset: number;
  contentPercent: number;
};

const getScreenWidth = () => Dimensions.get('window').width;

export const badge = {
  header: (CharacterSvg: React.FC<SvgProps>): FullBadgePreset => {
    const width = getScreenWidth();
    return {
      CharacterSvg,
      diameter: width * 0.3073,
      borderWidth: 3,
      inset: 0,
      contentPercent: 85,
    };
  },

  button: (CharacterSvg: React.FC<SvgProps>): FullBadgePreset => {
    const width = getScreenWidth();
    const ideal = width * 0.22;
    const clamped = Math.min(92, Math.max(76, ideal));
    return {
      CharacterSvg,
      diameter: Math.round(clamped),
      borderWidth: 3,
      inset: 0,
      contentPercent: 80,
    };
  },
} as const;

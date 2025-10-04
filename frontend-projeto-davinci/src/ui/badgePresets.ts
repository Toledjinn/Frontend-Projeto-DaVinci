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
  /** Header padrão (mascote): diâmetro do PageHeader, conteúdo 85% */
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

  /** Botões/grade: ideal = width*0.22 (clamp 76..92), conteúdo 80%, com sombra */
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
      style: shadowSoft,
    };
  },

  /** Loja/Estoque (grid): fixo 100px, ícone 60%, com sombra */
  store: (CharacterSvg: React.FC<SvgProps>): FullBadgePreset => ({
    CharacterSvg,
    diameter: 100,
    borderWidth: 3,
    inset: 0,
    contentPercent: 60,
    style: shadowSoft,
  }),

  /**
   * ✅ NOVO: Header da loja com ícone de produto no centro
   * - diâmetro = PageHeader (width * 0.3073)
   * - proporção do conteúdo = 60% (igual aos botões da loja)
   * - sem sombra
   */
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

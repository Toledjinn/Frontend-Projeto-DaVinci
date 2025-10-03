import React from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { styles, getMetrics } from './styles';

type LogoBadgeProps = {
  CharacterSvg: React.FC<SvgProps>;
  /** Diâmetro do círculo em px.
   *  Dica: no Header calcule pelo screenWidth; em listas/cards, passe um fixo (ex.: 56, 72). */
  diameter: number;
  borderWidth?: number;
  backgroundColor?: string;
  borderColor?: string;
  /** Se for clicável fora do header */
  onPress?: () => void;
  /** Estilo extra para posicionamento externo */
  style?: ViewStyle;
  /** Se quiser renderizar algo absoluto por cima (ex.: um “badge” de notificação) */
  overlay?: React.ReactNode;
  /** Padding interno (opcional) em px se quiser “respiro” pro SVG */
  inset?: number;
};

export default function LogoBadge({
  CharacterSvg,
  diameter,
  borderWidth = 3,
  backgroundColor,
  borderColor,
  onPress,
  style,
  overlay,
  inset = 0,
}: LogoBadgeProps) {
  const m = getMetrics(diameter, borderWidth, inset);

  const Circle = (
    <View
      style={[
        styles.circle,
        {
          width: m.d,
          height: m.d,
          borderRadius: m.r,
          borderWidth: m.bw,
          padding: m.inset,
          backgroundColor,
          borderColor,
        },
        style,
      ]}
    >
      <View style={styles.characterWrap}>
        <CharacterSvg width="100%" height="100%" />
      </View>

      {overlay ? <View style={styles.overlay}>{overlay}</View> : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        android_ripple={{ color: '#00000012', borderless: true }}
        accessibilityRole="button"
        accessibilityLabel="Abrir"
        style={{ borderRadius: m.r }}
      >
        {Circle}
      </Pressable>
    );
  }

  return Circle;
}

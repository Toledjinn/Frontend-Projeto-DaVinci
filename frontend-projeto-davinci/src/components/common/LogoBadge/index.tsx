import React from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { styles, getMetrics } from './styles';

type LogoBadgeProps = {
  CharacterSvg: React.FC<SvgProps>;
  diameter: number;
  borderWidth?: number;
  backgroundColor?: string;
  borderColor?: string;
  onPress?: () => void;
  style?: ViewStyle;
  overlay?: React.ReactNode;
  inset?: number;
  contentPercent?: number;
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
  contentPercent,
}: LogoBadgeProps) {
  const m = getMetrics(diameter, borderWidth, inset);

  const innerBox = Math.max(0, m.d - 2 * m.inset);

  const contentSizeStyle: ViewStyle =
    typeof contentPercent === 'number'
      ? (() => {
          const pct = Math.max(0, Math.min(100, contentPercent));
          const px = (innerBox * pct) / 100;
          return { width: px, height: px };
        })()
      : { flex: 1 }; 

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
      <View style={[styles.characterWrap, contentSizeStyle]}>
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

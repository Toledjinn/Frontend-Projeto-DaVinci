import React from 'react';
import { View, Pressable } from 'react-native';
import { SvgProps } from 'react-native-svg';
import {
  styles,
  getMetrics,
  makeCircleStyle,
  makeContentSizeStyle,
  makePressableStyle,
} from './styles';

export type LogoBadgeProps = {
  CharacterSvg: React.FC<SvgProps>;
  diameter: number;
  borderWidth?: number;
  backgroundColor?: string;
  onPress?: () => void;
  style?: object;
  overlay?: React.ReactNode;
  inset?: number;
  contentPercent?: number; 
};

function LogoBadgeBase({
  CharacterSvg,
  diameter,
  borderWidth = 3,
  backgroundColor,
  onPress,
  style,
  overlay,
  inset = 0,
  contentPercent,
}: LogoBadgeProps) {
  const m = getMetrics(diameter, borderWidth, inset);

  const innerBox = Math.max(0, m.d - 2 * m.inset);

  const circleStyle = makeCircleStyle(m, backgroundColor);
  const contentSizeStyle = makeContentSizeStyle(innerBox, contentPercent);
  const pressableStyle = makePressableStyle(m.r);

  const Circle = (
    <View style={[styles.circle, circleStyle, style]}>
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
        style={pressableStyle}
      >
        {Circle}
      </Pressable>
    );
  }

  return Circle;
}

export default React.memo(LogoBadgeBase);

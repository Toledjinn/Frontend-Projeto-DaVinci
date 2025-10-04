import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '@/constants/theme';

export const getMetrics = (diameter: number, borderWidth: number, inset: number) => {
  const d = Math.max(0, diameter);
  const bw = Math.max(0, borderWidth);
  const r = d / 2;
  const safeInset = Math.max(0, inset);
  return { d, bw, r, inset: safeInset };
};

export const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  characterWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    right: 2,
    top: 2,
  },
});


export const makeCircleStyle = (
  m: ReturnType<typeof getMetrics>,
  backgroundColor?: string,
): ViewStyle => ({
  width: m.d,
  height: m.d,
  borderRadius: m.r,
  borderWidth: m.bw,
  padding: m.inset,
  backgroundColor,
  borderColor: COLORS.secondary, 
});


export const makeContentSizeStyle = (
  innerBox: number,
  contentPercent?: number,
): ViewStyle => {
  if (typeof contentPercent !== 'number') return { flex: 1 };
  const pct = Math.max(0, Math.min(100, contentPercent));
  const px = (innerBox * pct) / 100;
  return { width: px, height: px };
};


export const makePressableStyle = (radius: number): ViewStyle => ({
  borderRadius: radius,
});

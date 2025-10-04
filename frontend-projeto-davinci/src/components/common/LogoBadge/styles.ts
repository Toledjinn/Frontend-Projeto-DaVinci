// LogoBadge/styles.ts
import { StyleSheet } from 'react-native';

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
    // agora o tamanho vem de contentSizeStyle; usamos só centralização
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    right: 2,
    top: 2,
  },
});

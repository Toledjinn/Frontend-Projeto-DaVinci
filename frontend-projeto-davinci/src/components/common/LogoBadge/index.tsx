import React from 'react';
import { View, Pressable, ViewStyle, Image, ImageSourcePropType } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { styles, getMetrics } from './styles';

type LogoBadgeProps = {
  /** SVG (mascote/avatar em vetor). Continua funcionando como antes. */
  CharacterSvg?: React.FC<SvgProps> | null;
  /** Imagem (png/jpg/local ou remota). Se presente, tem prioridade sobre o SVG. */
  imageSource?: ImageSourcePropType;

  /** Diâmetro do círculo (px). */
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
  /** Padding interno (opcional) em px se quiser “respiro” pro conteúdo */
  inset?: number;

  /** Ex.: 60 significa 60% do espaço interno útil (após o inset) */
  contentPercent?: number;
};

export default function LogoBadge({
  CharacterSvg,
  imageSource,
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

  // tamanho interno útil (depois do padding/inset)
  const innerBox = Math.max(0, m.d - 2 * m.inset);

  // Se vier contentPercent, converte para PX. Caso contrário, usa flex:1 (preenche o wrap).
  const contentSizeStyle =
    typeof contentPercent === 'number'
      ? (() => {
          const pct = Math.max(0, Math.min(100, contentPercent));
          const px = (innerBox * pct) / 100;
          return { width: px, height: px } as const;
        })()
      : ({ flex: 1 } as const);

  const Content = () => {
    // Prioriza imagem se fornecida
    if (imageSource) {
      return (
        <Image
          source={imageSource}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />
      );
    }
    // Caso contrário, usa o SVG se existir
    if (CharacterSvg) {
      return <CharacterSvg width="100%" height="100%" />;
    }
    // Sem conteúdo => nada (círculo vazio)
    return null;
  };

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
        <Content />
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

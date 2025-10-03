import React, { useMemo } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { getPageHeaderStyles } from './styles';
import LogoBadge from '../LogoBadge';
import { COLORS } from '@/constants/theme';

type PageHeaderProps = {
  CharacterSvg: React.FC<SvgProps>;
  title: string;
};

export default function PageHeader({ CharacterSvg, title }: PageHeaderProps) {
  const { width, height } = useWindowDimensions();
  const styles = getPageHeaderStyles(width, height);

  const circleDiameter = useMemo(() => width * 0.3073, [width]);
  const chefinhoTopPosition = useMemo(() => height * 0.07, [height]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.circleAnchor,
          { top: chefinhoTopPosition, width: circleDiameter, height: circleDiameter },
        ]}
      >
        <LogoBadge
          CharacterSvg={CharacterSvg}
          diameter={circleDiameter}
          borderWidth={3}
          backgroundColor={COLORS.primary}
          borderColor={COLORS.secondary}
        />
      </View>

      <Text style={[styles.title, { top: chefinhoTopPosition + circleDiameter + 8 }]}>
        {title}
      </Text>
    </View>
  );
}

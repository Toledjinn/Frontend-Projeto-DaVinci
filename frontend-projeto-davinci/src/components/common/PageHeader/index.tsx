import React, { useMemo } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { getPageHeaderStyles } from './styles';
import LogoBadge from '../LogoBadge';
import { COLORS } from '@/constants/theme';
import { badgePresets } from '@/ui/badgePresets';

type PageHeaderProps = {
  CharacterSvg: React.FC<SvgProps>;
  title: string;
};

export default function PageHeader({ CharacterSvg, title }: PageHeaderProps) {
  const { width, height } = useWindowDimensions();
  const styles = getPageHeaderStyles(width, height);

  const chefinhoTopPosition = useMemo(() => height * 0.07, [height]);

  const headerPreset = useMemo(() => badgePresets.header(width), [width]);
  const circleDiameter = headerPreset.diameter;

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
          {...headerPreset}                
          backgroundColor={COLORS.primary} 
        />
      </View>

      <Text style={[styles.title, { top: chefinhoTopPosition + circleDiameter + 8 }]}>
        {title}
      </Text>
    </View>
  );
}

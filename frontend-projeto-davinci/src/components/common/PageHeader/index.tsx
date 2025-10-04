import React, { useMemo } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { getPageHeaderStyles } from './styles';
import LogoBadge from '@/components/common/LogoBadge';
import { badge, FullBadgePreset } from '@/ui/badgePresets';

type PageHeaderProps = {
  CharacterSvg: React.FC<SvgProps>;
  title: string;

  badgePreset?: (svg: React.FC<SvgProps>) => FullBadgePreset;
};

export default function PageHeader({
  CharacterSvg,
  title,
  badgePreset = badge.header, 
}: PageHeaderProps) {
  const { width, height } = useWindowDimensions();
  const styles = getPageHeaderStyles(width, height);

  const preset = useMemo(() => badgePreset(CharacterSvg), [badgePreset, CharacterSvg]);
  const circleDiameter = preset.diameter;
  const chefinhoTopPosition = useMemo(() => height * 0.07, [height]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.circleAnchor,
          { top: chefinhoTopPosition, width: circleDiameter, height: circleDiameter },
        ]}
      >
        <LogoBadge {...preset} />
      </View>

      <Text style={[styles.title, { top: chefinhoTopPosition + circleDiameter + 8 }]}>
        {title}
      </Text>
    </View>
  );
}

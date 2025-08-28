import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native'; 
import { SvgProps } from 'react-native-svg';
import { getLargePageHeaderStyles } from './styles'; 

type LargePageHeaderProps = {
  CharacterSvg: React.FC<SvgProps>;
  title: string; 
};

export default function LargePageHeader({ CharacterSvg, title }: LargePageHeaderProps) {
  const { width, height } = useWindowDimensions(); 
  const styles = getLargePageHeaderStyles(width, height); 

  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircle}>
        <View style={styles.characterWrapper}>
          <CharacterSvg width="100%" height="100%" />
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
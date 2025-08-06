import React, { useState } from 'react';
import { View, Text, useWindowDimensions, NativeSyntheticEvent, TextLayoutEventData } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { getProfileHeaderStyles } from './styles'; 
import RiskLevelIndicator from '../RiskLevelIndicator';

type RiskLevel = 'baixo' | 'moderado' | 'alto';

type ProfileHeaderProps = {
  UserImageSvg: React.FC<SvgProps>;
  userName: string;
  riskLevel?: RiskLevel; 
};

export default function ProfileHeader({ UserImageSvg, userName, riskLevel }: ProfileHeaderProps) {
  const { width, height } = useWindowDimensions(); 
  const [numberOfLines, setNumberOfLines] = useState(0);
  
  const onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    const lines = e.nativeEvent.lines.length;
    if (lines > 0 && lines !== numberOfLines) {
      setNumberOfLines(lines);
    }
  };

  const styles = getProfileHeaderStyles(width, height, !!riskLevel);
  const singleLineHeight = styles.userName.lineHeight || 22;
  const verticalShift = numberOfLines > 1 ? -singleLineHeight / 2 : 0;

  return (
    <View style={[styles.container, { transform: [{ translateY: verticalShift }] }]}>
      <View style={styles.backgroundCircle}>
        <View style={styles.imageWrapper}>
          <UserImageSvg width="100%" height="100%" />
        </View>
      </View>
      <Text style={styles.userName} onTextLayout={onTextLayout} key={userName}>
        {userName}
      </Text>
      {riskLevel && (
        <View style={styles.riskContainer}>
            <RiskLevelIndicator level={riskLevel} />
        </View>
      )}
    </View>
  );
}

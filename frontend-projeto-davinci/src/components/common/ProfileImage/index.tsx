import React, { useState, memo } from 'react';
import { View, Text, useWindowDimensions, TextLayoutEvent, Image } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { getProfileHeaderStyles } from './styles';
import RiskLevelIndicator from '../RiskLevelIndicator';

type RiskLevel = 'baixo' | 'moderado' | 'alto';

type ProfileHeaderProps = {
  UserImageSvg: React.FC<SvgProps>;
  userName: string;
  riskLevel?: RiskLevel;
  photoUri?: string | null;
};

function ProfileHeaderBase({ UserImageSvg, userName, riskLevel, photoUri }: ProfileHeaderProps) {
  const { width, height } = useWindowDimensions();
  const [numberOfLines, setNumberOfLines] = useState(0);

  const onTextLayout = (e: TextLayoutEvent) => {
    const lines = e.nativeEvent.lines.length;
    if (lines > 0 && lines !== numberOfLines) setNumberOfLines(lines);
  };

  const styles = getProfileHeaderStyles(width, height, !!riskLevel);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircle}>
        <View style={styles.imageWrapper}>
          {photoUri ? (
            <Image
              key={photoUri}
              source={{ uri: photoUri }}
              style={styles.image} 
              resizeMode="cover"
            />
          ) : (
            <UserImageSvg width="100%" height="100%" />
          )}
        </View>
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.userName} onTextLayout={onTextLayout} key={userName}>
          {userName}
        </Text>
        {riskLevel && (
          <View style={styles.riskContainer}>
            <RiskLevelIndicator level={riskLevel} />
          </View>
        )}
      </View>
    </View>
  );
}

export default memo(ProfileHeaderBase);

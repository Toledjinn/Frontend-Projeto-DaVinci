import React, { useState } from 'react';
import { View, Text, useWindowDimensions, NativeSyntheticEvent, TextLayoutEventData } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { getProfileHeaderStyles } from './styles'; 

type ProfileHeaderProps = {
  UserImageSvg: React.FC<SvgProps>;
  userName: string;
};

export default function ProfileHeader({ UserImageSvg, userName }: ProfileHeaderProps) {
  const { width, height } = useWindowDimensions(); 
  const [numberOfLines, setNumberOfLines] = useState(0);
  
  const onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    const lines = e.nativeEvent.lines.length;
    if (lines > 0 && lines !== numberOfLines) {
      setNumberOfLines(lines);
    }
  };

  const styles = getProfileHeaderStyles(width, height); 
  const singleLineHeight = styles.userName.lineHeight || 22;

  const verticalShift = numberOfLines > 1 ? -singleLineHeight : 0;

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
    </View>
  );
}

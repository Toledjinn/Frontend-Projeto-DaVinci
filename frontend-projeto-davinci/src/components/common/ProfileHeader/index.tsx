import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { getProfileHeaderStyles } from './styles'; 

type ProfileHeaderProps = {
  UserImageSvg: React.FC<SvgProps>;
  userName: string;
};

export default function ProfileHeader({ UserImageSvg, userName }: ProfileHeaderProps) {
  const { width, height } = useWindowDimensions(); 
  const styles = getProfileHeaderStyles(width, height); 

  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircle}>
        <View style={styles.imageWrapper}>
          <UserImageSvg width="100%" height="100%" />
        </View>
      </View>
      <Text style={styles.userName}>{userName}</Text>
    </View>
  );
}

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

type ScreenFooterProps = {
  primaryButtonTitle: string;
  onPrimaryButtonPress: () => void;
  secondaryButtonTitle: string;
  onSecondaryButtonPress: () => void;
};

export default function ScreenFooter({
  primaryButtonTitle,
  onPrimaryButtonPress,
  secondaryButtonTitle,
  onSecondaryButtonPress,
}: ScreenFooterProps) {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={onSecondaryButtonPress}
      >
        <Text style={styles.secondaryButtonText}>{secondaryButtonTitle}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={onPrimaryButtonPress}
      >
        <Text style={styles.primaryButtonText}>{primaryButtonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}

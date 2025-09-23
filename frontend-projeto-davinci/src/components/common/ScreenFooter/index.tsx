import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

type ScreenFooterProps = {
  primaryButtonTitle: string;
  onPrimaryButtonPress: () => void;
  secondaryButtonTitle?: string;
  onSecondaryButtonPress?: () => void;
};

export default function ScreenFooter({
  primaryButtonTitle,
  onPrimaryButtonPress,
  secondaryButtonTitle,
  onSecondaryButtonPress,
}: ScreenFooterProps) {
  const isSingleButton = !secondaryButtonTitle;

  return (
    <View style={[styles.footerContainer, isSingleButton && styles.footerContainerSingle]}>
      {!isSingleButton && onSecondaryButtonPress && (
        <TouchableOpacity
          style={[
            styles.button,
            styles.primaryButton,
            styles.buttonFlex,
            styles.secondaryMargin,
          ]}
          onPress={onSecondaryButtonPress}
        >
          <Text style={styles.primaryButtonText}>{secondaryButtonTitle}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[
          styles.button,
          isSingleButton ? styles.primaryButton : styles.secondaryButton,
          isSingleButton ? styles.buttonSingle : [styles.buttonFlex, styles.primaryMargin],
        ]}
        onPress={onPrimaryButtonPress}
      >
        <Text style={isSingleButton ? styles.primaryButtonText : styles.secondaryButtonText}>
          {primaryButtonTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
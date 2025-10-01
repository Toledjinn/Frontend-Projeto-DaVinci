import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

type ButtonConfig = {
  title: string | undefined;
  onPress: () => void;
  variant: 'primary' | 'secondary';
};

type ScreenFooterProps = {
  buttons: ButtonConfig[];
};

export default function ScreenFooter({ buttons }: ScreenFooterProps) {
  if (!buttons || buttons.length === 0) {
    return null;
  }

  const numButtons = buttons.length;
  const isSingleButton = numButtons === 1;

  return (
    <View style={[styles.footerContainer, isSingleButton && styles.footerContainerSingle]}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            button.variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
            isSingleButton ? styles.buttonSingle : styles.buttonFlex,
            
            !isSingleButton && (index === 0 ? styles.leftButtonMargin : styles.rightButtonMargin),
          ]}
          onPress={button.onPress}
        >
          <Text style={button.variant === 'primary' ? styles.primaryButtonText : styles.secondaryButtonText}>
            {button.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
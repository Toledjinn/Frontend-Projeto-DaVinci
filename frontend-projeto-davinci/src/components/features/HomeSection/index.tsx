import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

type ButtonItem = {
  id: string;
  title: string;
  onPress: () => void;
};

type HomeSectionProps = {
  title: string;
  buttons: ButtonItem[];
};

export default function HomeSection({ title, buttons }: HomeSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonsContainer}>
        {buttons.map((button) => (
          <TouchableOpacity
            key={button.id}
            style={styles.button}
            onPress={button.onPress}
          >
            <Text style={styles.buttonText}>{button.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

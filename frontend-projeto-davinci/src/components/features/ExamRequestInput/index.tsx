import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './styles';

export default function ExamRequestInput() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitação de Exames</Text>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        placeholder="Digite os exames solicitados..."
        multiline
      />
    </View>
  );
}
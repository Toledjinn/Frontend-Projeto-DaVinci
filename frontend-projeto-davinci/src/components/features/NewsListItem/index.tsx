import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '@/constants/theme';

export type NewsItemProps = {
  id: string;
  image: ImageSourcePropType;
  title: string;
  snippet: string;
  content: string;
  date: string;
};

type Props = {
  item: NewsItemProps;
  onPress: () => void;
};

const NewsListItem = React.memo(({ item, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.titleText} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.snippetText} numberOfLines={2}>{item.snippet}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Feather name="chevron-right" size={28} color={COLORS.gray_200} />
      </View>
    </TouchableOpacity>
  );
});

export default NewsListItem;

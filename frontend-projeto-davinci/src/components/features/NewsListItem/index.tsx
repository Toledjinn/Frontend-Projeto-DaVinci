import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '@/constants/theme';
import { useNewsStore } from '@/state/newsStore';

type Props = {
  id: string;
  onPress: (id: string) => void;
};

const NewsListItem = React.memo(({ id, onPress }: Props) => {
  const newsItem = useNewsStore(
    useCallback((s) => s.getNewsById(id), [id])
  );

  if (!newsItem) return null;

  const { image, title, content } = newsItem;

  const snippet = (content ?? '').trim();
  const short = snippet.length > 140 ? snippet.slice(0, 140) + '…' : snippet;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(id)}
      activeOpacity={0.7}
    >
      {image ? (
        <Image source={image} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Feather name="image" size={20} color={COLORS.gray_400} />
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.titleText} numberOfLines={2}>
          {title}
        </Text>
        {!!short && (
          <Text style={styles.snippetText} numberOfLines={2}>
            {short}
          </Text>
        )}
      </View>

      <View style={styles.iconContainer}>
        <Feather name="chevron-right" size={28} color={COLORS.gray_400} />
      </View>
    </TouchableOpacity>
  );
});

export default NewsListItem;

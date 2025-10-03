import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ProductItem } from '@/state/lojaStore';
import { styles } from './styles';

type Props = {
  product: ProductItem;
  onPress: (productId: string) => void;
};

const ProductListItem = React.memo(({ product, onPress }: Props) => {
  return (
    <Pressable
      style={styles.card}
      onPress={() => onPress(product.id)}
      android_ripple={{ color: '#0000000f' }}
    >
      <View style={styles.imageWrap}>
        <Image source={product.image} style={styles.image} />
      </View>

      <View style={styles.textCol}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        <Text style={styles.brand} numberOfLines={1}>
          {product.brand}
        </Text>

        <Text style={styles.price}>
          R$ {product.price.toFixed(2).replace('.', ',')}
        </Text>
      </View>

      <Feather
        name="chevron-right"
        size={22}
        color={styles.chevron.color as string}
      />
    </Pressable>
  );
});

export default ProductListItem;

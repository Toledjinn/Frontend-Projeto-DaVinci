import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles, getStatusColor } from './styles';
import { OrderItem, ProductInOrder } from '@/state/pedidosStore';

type OrderListItemProps = {
  item: OrderItem;
  onPress: () => void;
};

// Pequeno componente interno para renderizar cada produto
const ProductRow = ({ product }: { product: ProductInOrder }) => (
  <View style={styles.productRow}>
    <Image source={product.image} style={styles.productImage} />
    <View>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productQuantity}>Quantidade: {product.quantity}</Text>
    </View>
  </View>
);

export default function OrderListItem({ item, onPress }: OrderListItemProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <Text style={styles.orderId}>ID do Pedido: #{item.id}</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
            {item.status}
          </Text>
          <Feather name="chevron-right" size={24} color={styles.chevron.color} />
        </View>
      </View>

      <View style={styles.productList}>
        {item.products.map((product) => (
          <ProductRow key={product.productId} product={product} />
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerLabel}>Valor total</Text>
        <Text style={styles.footerValue}>R$ {item.totalValue.toFixed(2).replace('.', ',')}</Text>
      </View>
    </TouchableOpacity>
  );
}


import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import styles from './DetalhesPedidoScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { usePedidosStore, OrderStatus } from '@/state/pedidosStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';

const userType = 'admin';

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'Aprovado':
    case 'Entregue':
      return COLORS.green;
    case 'Pendente':
      return COLORS.yellow;
    case 'Enviado':
      return COLORS.blue;
    case 'Cancelado':
      return COLORS.red;
    default:
      return COLORS.gray_400;
  }
};

export default function DetalhesPedidoScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  
  const { getOrderById, updateOrderStatus } = usePedidosStore();
  const order = useMemo(() => getOrderById(id!), [id, getOrderById]);

  const [currentStatus, setCurrentStatus] = useState(order?.status);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page-large',
        showPageHeaderElements: true,
        pageTitle: 'DETALHES DO PEDIDO',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [])
  );

  const handleStatusChange = (newStatus: OrderStatus) => {
    setCurrentStatus(newStatus);
    updateOrderStatus(id!, newStatus);
    Alert.alert('Sucesso', `O status do pedido foi atualizado para "${newStatus}".`);
  };

  if (!order) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centeredMessage}><Text>Pedido não encontrado.</Text></View>
      </SafeAreaView>
    );
  }

  const statusOptions: OrderStatus[] = ['Pendente', 'Aprovado', 'Enviado', 'Entregue', 'Cancelado'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cliente</Text>
          <Text style={styles.customerName}>{order.customerName}</Text>
          {order.address && <Text style={styles.customerAddress}>{order.address}</Text>}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Produtos</Text>
          {order.products.map(product => (
            <View key={product.productId} style={styles.productRow}>
              <Image source={product.image} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDetails}>Qtd: {product.quantity} - R$ {product.price.toFixed(2).replace('.', ',')}</Text>
              </View>
              <Text style={styles.productTotal}>R$ {(product.quantity * product.price).toFixed(2).replace('.', ',')}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Valor Total</Text>
            <Text style={styles.summaryValue}>R$ {order.totalValue.toFixed(2).replace('.', ',')}</Text>
          </View>
        </View>

        {userType === 'admin' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Alterar Status</Text>
            <View style={styles.statusContainer}>
              {statusOptions.map(status => (
                <TouchableOpacity
                  key={status}
                  style={[styles.statusButton, currentStatus === status && styles.statusButtonSelected]}
                  onPress={() => handleStatusChange(status)}
                >
                  <Text style={[styles.statusButtonText, currentStatus === status && styles.statusButtonTextSelected]}>{status}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}


import React, { useCallback, useState, useMemo } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import styles from './PedidosScreen.styles';
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
      return COLORS.primary;
    case 'Enviado':
      return COLORS.blue;
    case 'Cancelado':
      return COLORS.red;
    default:
      return COLORS.gray_400;
  }
};

export default function PedidosScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.29;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  
  const allOrders = usePedidosStore((state) => state.orders);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = useMemo(() => {
    const nonCancelledOrders = allOrders.filter(order => order.status !== 'Cancelado');

    if (!searchQuery) {
      return nonCancelledOrders;
    }
    return nonCancelledOrders.filter((order) =>
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allOrders, searchQuery]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page-large',
        showPageHeaderElements: true,
        pageTitle: 'PEDIDOS',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [])
  );
  
  const handleViewPress = (orderId: string) => {
    router.push({ pathname: '/(app)/detalhes-pedido', params: { id: orderId } });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
      >
        <View style={styles.searchBar}>
          <Feather name="list" size={20} color={COLORS.gray_400} />
          <TextInput
            style={styles.searchInput}
            placeholder="Digite o nome do cliente"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Feather name="search" size={20} color={COLORS.gray_400} />
        </View>

        {filteredOrders.map((order) => (
          <TouchableOpacity 
            key={order.id} 
            style={styles.orderCard} 
            onPress={() => handleViewPress(order.id)}
          >
            <View style={styles.orderInfo}>
              <Text style={styles.customerName}>{order.customerName}</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Valor total</Text>
                <Text style={styles.value}>R$ {order.totalValue.toFixed(2).replace('.', ',')}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Status</Text>
                <Text style={[styles.status, { color: getStatusColor(order.status) }]}>{order.status}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Produtos</Text>
                <Text style={styles.value}>{order.productCount}</Text>
              </View>
            </View>
            <View style={styles.chevronContainer}>
              <Feather name="chevron-right" size={24} color={COLORS.gray_400} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
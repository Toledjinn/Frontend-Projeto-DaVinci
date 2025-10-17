import React, { useCallback, useState, useMemo } from 'react';
import { Text, FlatList, useWindowDimensions } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import styles from './PedidosScreen.styles';
import { useUIStore } from '@/state/uiStore';
import { usePedidosStore, OrderItem, OrderStatus } from '@/state/pedidosStore';
import Chefinho from '@/assets/characters/chefinho.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderListItem from '@/components/features/OrderListItem';
import OrderFilterModal from '@/components/features/OrderFilterModal';
import SearchAndFilterBar from '@/components/features/SearchAndFilterBar';

const ALL_STATUSES: OrderStatus[] = ['Pendente', 'Aprovado', 'Enviado', 'Entregue'];

export default function PedidosScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.20;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);

  const allOrders = usePedidosStore((state) => state.orders);

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<OrderStatus[]>([]);

  const filteredOrders = useMemo(() => {
    let orders = allOrders.filter((order) => order.status !== 'Cancelado');

    if (selectedStatuses.length > 0) {
      orders = orders.filter((order) => selectedStatuses.includes(order.status));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      orders = orders.filter((order) => order.customerName.toLowerCase().includes(q));
    }

    return orders;
  }, [allOrders, searchQuery, selectedStatuses]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Pedidos',
        CharacterSvg: Chefinho,
        showNotificationIcon: true,
      });
    }, [])
  );

  const handleViewPress = (orderId: string) => {
    router.push({ pathname: '/(app)/detalhes-pedido', params: { id: orderId } });
  };

  const handleApplyFilter = (filters: { statuses: OrderStatus[] }) => {
    setSelectedStatuses(filters.statuses);
  };

  const statusOptions = ALL_STATUSES.map((s) => ({ label: s, value: s }));

  const renderOrder = ({ item }: { item: OrderItem }) => (
    <OrderListItem item={item} onPress={() => handleViewPress(item.id)} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={filteredOrders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
        ListHeaderComponent={
          <SearchAndFilterBar
            value={searchQuery}
            placeholder="Pesquisar por cliente..."
            onSearchChange={setSearchQuery}
            onFilterPress={() => setFilterModalVisible(true)}
          />
        }
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum pedido encontrado.</Text>}
      />
      <OrderFilterModal
        visible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilter}
        statusOptions={statusOptions}
        initialFilters={{ statuses: selectedStatuses }}
      />
    </SafeAreaView>
  );
}

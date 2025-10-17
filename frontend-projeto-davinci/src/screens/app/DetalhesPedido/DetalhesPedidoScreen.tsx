import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/theme';
import { Feather } from '@expo/vector-icons';

const userType = 'admin';

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'Aprovado':
    case 'Entregue':
      return COLORS.green;
    case 'Pendente':
      return COLORS.pendente;
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

  const updateOrderStatus = usePedidosStore((s) => s.updateOrderStatus);
  const order = usePedidosStore(
    useCallback((s) => (id ? s.orders.find((o) => o.id === id) : undefined), [id])
  );

  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [tempSelectedStatus, setTempSelectedStatus] = useState<OrderStatus | undefined>(
    order?.status
  );

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Detalhes do Pedido',
        CharacterSvg: Chefinho,
        showNotificationIcon: false,
      });
    }, [])
  );

  React.useEffect(() => {
    if (order?.status) setTempSelectedStatus(order.status);
  }, [order?.status]);

  if (!order) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centeredMessage}>
          <Text>Pedido não encontrado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const statusOptions: OrderStatus[] = ['Pendente', 'Aprovado', 'Enviado', 'Entregue', 'Cancelado'];

  const enterEditStatus = () => {
    setTempSelectedStatus(order.status);
    setIsEditingStatus(true);
  };

  const saveStatusChange = () => {
    if (!tempSelectedStatus || tempSelectedStatus === order.status) {
      setIsEditingStatus(false);
      return;
    }
    updateOrderStatus(order.id, tempSelectedStatus);
    setIsEditingStatus(false);
    Alert.alert('Sucesso', `O status do pedido foi atualizado para "${tempSelectedStatus}".`);
  };

  const formatBRL = (n: number) => n.toFixed(2).replace('.', ',');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.titleText}>Cliente</Text>
            <View />
          </View>
          <Text style={styles.customerName}>{order.customerName}</Text>
          {!!order.address && <Text style={styles.customerAddress}>{order.address}</Text>}
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.titleText}>Produtos</Text>
            <View />
          </View>

          {order.products.map((product, index) => {
            const isMultiple = order.products.length > 1;
            const isLast = index === order.products.length - 1;

            return (
              <View
                key={product.productId}
                style={[styles.productRow, isMultiple && !isLast && styles.productItemList]}
              >
                <Image source={product.image} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productDetails}>
                    Qtd: {product.quantity} — R$ {formatBRL(product.price)}
                  </Text>
                </View>
                <Text style={styles.productTotal}>
                  R$ {formatBRL(product.quantity * product.price)}
                </Text>
              </View>
            );
          })}

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Valor Total</Text>
            <Text style={styles.summaryValue}>R$ {formatBRL(order.totalValue)}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.titleText}>Status</Text>
            {userType === 'admin' && (
              <TouchableOpacity
                onPress={isEditingStatus ? saveStatusChange : enterEditStatus}
                style={styles.iconButton}
                accessibilityRole="button"
                accessibilityLabel={isEditingStatus ? 'Salvar status' : 'Editar status'}
              >
                <Feather name={isEditingStatus ? 'check' : 'edit-2'} size={25} color={COLORS.secondary} />
              </TouchableOpacity>
            )}
          </View>

          {!isEditingStatus && (
            <View style={styles.statusView}>
              <View style={styles.statusChip}>
                <Text style={[styles.statusChipText, { color: getStatusColor(order.status) }]}>
                  {order.status}
                </Text>
              </View>
            </View>
          )}

          {isEditingStatus && (
            <View style={styles.statusContainer}>
              {statusOptions.map((status) => {
                const selected = tempSelectedStatus === status;
                return (
                  <TouchableOpacity
                    key={status}
                    style={[styles.statusButton, selected && styles.statusButtonSelected]}
                    onPress={() => setTempSelectedStatus(status)}
                    accessibilityRole="button"
                    accessibilityLabel={`Selecionar status ${status}`}
                  >
                    <Text style={[styles.statusButtonText, selected && styles.statusButtonTextSelected]}>
                      {status}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

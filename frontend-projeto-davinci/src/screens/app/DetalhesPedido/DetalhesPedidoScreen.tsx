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
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const userType = 'admin';

export default function DetalhesPedidoScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.216;
  const setHeaderConfig = useUIStore((state) => state.setHeaderConfig);
  
  const { getOrderById, updateOrderStatus } = usePedidosStore();
  const order = useMemo(() => getOrderById(id!), [id, getOrderById]);

  const [currentStatus, setCurrentStatus] = useState(order?.status);

  React.useEffect(() => {
    setCurrentStatus(order?.status);
  }, [order?.status]);

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        visible: true,
        layout: 'page',
        showPageHeaderElements: true,
        pageTitle: 'Detalhes do Pedido',
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
          <View style={styles.card}>
            <Text style={styles.customerName}>{order.customerName}</Text>
            {order.address && <Text style={styles.customerAddress}>{order.address}</Text>}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Produtos</Text>
          <View style={styles.card}>
            {order.products.map((product, index) => (
              <View 
                key={product.productId} 
                style={[
                  styles.productRow, 
                  index === order.products.length - 1 && { borderBottomWidth: 0 }
                ]}
              >
                <Image source={product.image} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productDetails}>Qtd: {product.quantity} - R$ {product.price.toFixed(2).replace('.', ',')}</Text>
                </View>
                <Text style={styles.productTotal}>R$ {(product.quantity * product.price).toFixed(2).replace('.', ',')}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo</Text>
          <View style={styles.card}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Valor Total</Text>
              <Text style={styles.summaryValue}>R$ {order.totalValue.toFixed(2).replace('.', ',')}</Text>
            </View>
          </View>
        </View>

        {userType === 'admin' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Alterar Status</Text>
            <View style={styles.statusContainer}>
              {statusOptions.map(status => (
                <TouchableOpacity
                  style={[
                    styles.statusButton,
                    status === 'Cancelado' && styles.statusButtonCancel,
                    currentStatus === status && styles.statusButtonSelected,
                  ]}
                  onPress={() => handleStatusChange(status)}
                >
                  <Text 
                    style={[
                      styles.statusButtonText,
                      status === 'Cancelado' && styles.statusButtonTextCancel,
                      currentStatus === status && styles.statusButtonTextSelected,
                    ]}
                  >
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
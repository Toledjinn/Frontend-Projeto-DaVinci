import { create } from 'zustand';
import { ImageSourcePropType } from 'react-native';

export type OrderStatus = 'Pendente' | 'Aprovado' | 'Enviado' | 'Entregue' | 'Cancelado';

export type ProductInOrder = {
  productId: string;
  name: string;
  quantity: number;
  image: ImageSourcePropType;
};

export type OrderItem = {
  id: string;
  date: string;
  customerName: string;
  address?: string; 
  totalValue: number;
  status: OrderStatus;
  products: ProductInOrder[];
};

type PedidosState = {
  orders: OrderItem[];
  getOrderById: (orderId: string) => OrderItem | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
};

const MOCK_DATA: OrderItem[] = [
  { 
    id: 'ord1', 
    date: '2025/09/25',
    customerName: 'Rafael Ferreira Resende', 
    address: 'Rua das Flores, 123, Bairro Jardim, Cidade-UF, CEP 12345-678',
    totalValue: 59.99, 
    status: 'Pendente', 
    products: [
      { productId: 'esc1', name: 'Escova Slim Soft', quantity: 2, image: require('@/assets/images/produto-1.png') },
      { productId: 'pas1', name: 'Pasta Total Care', quantity: 1, image: require('@/assets/images/produto-2.png') },
    ]
  },
  { 
    id: 'ord2', 
    date: '2025/10/01',
    customerName: 'Bruce Wayne', 
    address: 'Mansão Wayne, Gotham City',
    totalValue: 159.99, 
    status: 'Pendente', 
    products: [
        { productId: 'esc2', name: 'Escova Infantil', quantity: 10, image: require('@/assets/images/placeholder.png') },
    ]
  },
  { 
    id: 'ord3', 
    date: '2025/10/02',
    customerName: 'Anderson Silva', 
    address: 'Avenida Principal, 987, Centro, Cidade-UF, CEP 98765-432',
    totalValue: 59.99, 
    status: 'Aprovado', 
    products: [
        { productId: 'esc1', name: 'Escova Slim Soft', quantity: 2, image: require('@/assets/images/produto-1.png') },
    ]
  },
];

export const usePedidosStore = create<PedidosState>((set, get) => ({
  orders: MOCK_DATA,

  getOrderById: (orderId) => {
    return get().orders.find(order => order.id === orderId);
  },

  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      ),
    }));
  },
}));


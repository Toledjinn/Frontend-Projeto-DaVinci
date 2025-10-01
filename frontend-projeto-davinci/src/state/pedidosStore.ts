import { create } from 'zustand';
import { ImageSourcePropType } from 'react-native';

export type OrderStatus = 'Pendente' | 'Aprovado' | 'Enviado' | 'Entregue' | 'Cancelado';

export type ProductInOrder = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: ImageSourcePropType;
};

export type OrderItem = {
  id: string;
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
    customerName: 'Rafael Ferreira Resende', 
    address: 'Rua das Flores, 123, Bairro Jardim, Cidade-UF, CEP 12345-678',
    totalValue: 59.99, 
    status: 'Pendente', 
    products: [
      { productId: 'esc1', name: 'Escova Slim Soft', quantity: 2, price: 19.99, image: require('@/assets/images/placeholder.png') },
      { productId: 'pas1', name: 'Pasta Total Care', quantity: 1, price: 9.50, image: require('@/assets/images/placeholder.png') },
    ]
  },
  { 
    id: 'ord2', 
    customerName: 'Bruce Wayne', 
    address: 'Mansão Wayne, Gotham City',
    totalValue: 159.99, 
    status: 'Pendente', 
    products: [
        { productId: 'esc2', name: 'Escova Infantil', quantity: 10, price: 15.99, image: require('@/assets/images/placeholder.png') },
    ]
  },
  { 
    id: 'ord3', 
    customerName: 'Anderson Silva', 
    address: 'Avenida Principal, 987, Centro, Cidade-UF, CEP 98765-432',
    totalValue: 59.99, 
    status: 'Aprovado', 
    products: [
        { productId: 'esc1', name: 'Escova Slim Soft', quantity: 2, price: 19.99, image: require('@/assets/images/placeholder.png') },
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


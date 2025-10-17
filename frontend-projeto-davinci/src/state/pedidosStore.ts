import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  date: string;                
  customerName: string;
  address?: string;
  totalValue: number;
  status: OrderStatus;
  products: ProductInOrder[];
};

type CreateOrderOpts = {
  customerName?: string;
  address?: string;
};

export type CartSnapshotItem = {
  id: string;                   
  name: string;
  quantity: number;
  price: number;               
  image: ImageSourcePropType;
};

type PedidosState = {
  orders: OrderItem[];
  isHydrated: boolean;
  hydrate: () => void;

  getOrderById: (orderId: string) => OrderItem | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  addOrderFromCart: (cart: CartSnapshotItem[], opts?: CreateOrderOpts) => OrderItem;
  clearAllOrders: () => void;
};

const SEED: OrderItem[] = [];

export const usePedidosStore = create<PedidosState>()(
  persist(
    (set, get) => ({
      orders: SEED,
      isHydrated: false,
      hydrate: () => set({ isHydrated: true }),

      getOrderById: (orderId) => get().orders.find((o) => o.id === orderId),

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
        }));
      },

      addOrderFromCart: (cart, opts) => {
        if (!cart || cart.length === 0) {
          throw new Error('Carrinho vazio. Não é possível criar pedido.');
        }

        const now = new Date();
        const totalValue = cart.reduce((acc, it) => acc + it.price * it.quantity, 0);
        const order: OrderItem = {
          id: `ord_${now.getTime()}`,
          date: now.toISOString(),
          customerName: opts?.customerName || 'Cliente',
          address: opts?.address,
          totalValue: Number(totalValue.toFixed(2)),
          status: 'Pendente',
          products: cart.map((it) => ({
            productId: it.id,
            name: it.name,
            quantity: it.quantity,
            price: it.price, 
            image: it.image,
          })),
        };

        set((state) => ({ orders: [order, ...state.orders] }));
        return order;
      },

      clearAllOrders: () => set({ orders: [] }),
    }),
    {
      name: 'davinci-pedidos-db',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state && state.hydrate();
      },
      partialize: (s) => ({ orders: s.orders }),
    }
  )
);

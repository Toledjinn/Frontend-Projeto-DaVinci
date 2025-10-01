import { create } from 'zustand';
import { ImageSourcePropType } from 'react-native';

export type CategoryName = 'Escovas' | 'Pastas de Dente' | 'Fio Dental' | 'Flúor' | 'Revelador de Placa' | 'Enxaguante Bucal';

export type ProductItem = {
  id: string;
  name: string;
  brand?: string; 
  description?: string;
  price: number;
  image: ImageSourcePropType;
};

export type CartItem = ProductItem & {
  quantity: number;
};

type LojaState = {
  products: Record<CategoryName, ProductItem[]>;
  cart: CartItem[];
  getProductsByCategory: (category: CategoryName) => ProductItem[];
  getProductById: (id: string) => ProductItem | undefined;
  addWithQuantity: (product: ProductItem, quantity: number) => void; 
  removeFromCart: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  getCartTotal: () => number;
};

const MOCK_PRODUCTS: Record<CategoryName, ProductItem[]> = {
  'Escovas': [
    { id: 'esc1', name: 'Slim Soft Black', brand: 'Colgate', description: 'Cerdas macias para uma limpeza profunda e suave, alcançando áreas de difícil acesso.', price: 19.99, image: require('@/assets/images/placeholder.png') },
    { id: 'esc2', name: 'Escova Kids', brand: 'Oral-B', description: 'Ideal para crianças de 2 a 5 anos, com cerdas extra macias e cabeça pequena para a boca dos pequenos.', price: 15.50, image: require('@/assets/images/placeholder.png') },
    { id: 'esc3', name: 'Escova de Bambu', brand: 'Orgânica', description: 'Sustentável e 100% biodegradável, uma alternativa ecológica para a higiene bucal.', price: 25.00, image: require('@/assets/images/placeholder.png') },
  ],
  'Pastas de Dente': [
    { id: 'pas1', name: 'Total Care', brand: 'Oral-B', description: 'Proteção completa para dentes e gengivas, combatendo cáries e tártaro.', price: 9.50, image: require('@/assets/images/placeholder.png') },
    { id: 'pas2', name: 'Branqueadora', brand: 'Colgate', description: 'Fórmula que remove manchas e clareia os dentes em duas semanas.', price: 12.90, image: require('@/assets/images/placeholder.png') },
  ],
  'Fio Dental': [
    { id: 'fio1', name: 'Pro-Saúde', brand: 'Oral-B', description: 'Fio resistente que desliza facilmente entre os dentes para uma limpeza eficaz.', price: 7.99, image: require('@/assets/images/placeholder.png') },
  ],
  'Flúor': [],
  'Revelador de Placa': [],
  'Enxaguante Bucal': [],
};

export const useLojaStore = create<LojaState>((set, get) => ({
  products: MOCK_PRODUCTS,
  cart: [],

  getProductsByCategory: (category) => {
    return get().products[category] || [];
  },

  getProductById: (id) => {
    const allProducts = Object.values(get().products).flat();
    return allProducts.find(product => product.id === id);
  },

  addWithQuantity: (product, quantity) => {
    set((state) => {
      const existingItem = state.cart.find(item => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          ),
        };
      } else {
        return {
          cart: [...state.cart, { ...product, quantity }],
        };
      }
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter(item => item.id !== productId),
    }));
  },

  incrementQuantity: (productId) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  },

  decrementQuantity: (productId) => {
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    }));
  },

  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
}));
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ImageSourcePropType } from 'react-native';

export type ProductStatus = 'Em estoque' | 'Poucas unidades' | 'Em falta';

export type ProductItem = {
  id: string;
  name: string;
  brand?: string;
  description?: string;
  price: number;
  status: ProductStatus;
  quantity: number;
  image: ImageSourcePropType; 
};

export type CategoryName =
  | 'Escovas'
  | 'Pastas de Dente'
  | 'Fio Dental'
  | 'Flúor'
  | 'Revelador de Placa'
  | 'Enxaguante Bucal';

type EstoqueState = {
  categories: Record<CategoryName, ProductItem[]>;
  isHydrated: boolean;
  hydrate: () => void;

  getById: (category: CategoryName, productId: string) => ProductItem | undefined;

  updateProduct: (
    category: CategoryName,
    productId: string,
    newContent: Partial<ProductItem>
  ) => void;

  addProduct: (category: CategoryName, product: Omit<ProductItem, 'id'>) => void;

  removeProduct: (category: CategoryName, productId: string) => void;
};

const MOCK_DATA: Record<CategoryName, ProductItem[]> = {
  Escovas: [
    {
      id: 'esc1',
      name: 'Slim Soft Black 2 unid.',
      brand: 'Colgate',
      description: 'Cerdas macias para uma limpeza profunda e suave.',
      price: 19.99,
      status: 'Em estoque',
      quantity: 5,
      image: require('@/assets/images/placeholder.png'),
    },
    {
      id: 'esc2',
      name: 'Slim Soft Black 2 unid.',
      brand: 'Colgate',
      description: 'Cerdas macias para uma limpeza profunda e suave.',
      price: 19.99,
      status: 'Poucas unidades',
      quantity: 5,
      image: require('@/assets/images/placeholder.png'),
    },
    {
      id: 'esc3',
      name: 'Slim Soft Black 2 unid.',
      brand: 'Colgate',
      description: 'Cerdas macias para uma limpeza profunda e suave.',
      price: 19.99,
      status: 'Em falta',
      quantity: 0,
      image: require('@/assets/images/placeholder.png'),
    },
  ],
  'Pastas de Dente': [
    {
      id: 'pas1',
      name: 'Total Care',
      brand: 'Oral-B',
      description: 'Proteção completa para dentes e gengivas.',
      price: 9.5,
      status: 'Em estoque',
      quantity: 100,
      image: require('@/assets/images/placeholder.png'),
    },
  ],
  'Fio Dental': [],
  Flúor: [],
  'Revelador de Placa': [],
  'Enxaguante Bucal': [],
};

export const useEstoqueStore = create<EstoqueState>()(
  persist(
    (set, get) => ({
      categories: MOCK_DATA,
      isHydrated: false,
      hydrate: () => {
      },

      getById: (category, productId) =>
        get().categories[category]?.find((p) => p.id === productId),

      updateProduct: (category, productId, newContent) => {
        set((state) => ({
          categories: {
            ...state.categories,
            [category]: state.categories[category].map((product) =>
              product.id === productId ? { ...product, ...newContent } : product
            ),
          },
        }));
      },

      addProduct: (category, product) => {
        set((state) => {
          const newProduct: ProductItem = { ...product, id: `prod_${Date.now()}` };
          return {
            categories: {
              ...state.categories,
              [category]: [...state.categories[category], newProduct],
            },
          };
        });
      },

      removeProduct: (category, productId) => {
        set((state) => ({
          categories: {
            ...state.categories,
            [category]: state.categories[category].filter((p) => p.id !== productId),
          },
        }));
      },
    }),
    {
      name: 'db-estoque-v1',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state, error) => {
        if (!error) {
          useEstoqueStore.setState({ isHydrated: true });
        } else {
          useEstoqueStore.setState({ isHydrated: true });
          console.warn('Falha ao reidratar estoque:', error);
        }
      },
      partialize: (s) => ({ categories: s.categories }),
    }
  )
);

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ImageSourcePropType } from 'react-native';

export type NewsItem = {
  id: string;
  title: string;
  snippet: string;
  content: string;
  date: string;
  image: ImageSourcePropType;
  videoUrl?: string;
};

type NewsState = {
  news: NewsItem[];

  isHydrated: boolean;
  hydrate: () => Promise<void>;

  getNewsById: (id: string) => NewsItem | undefined;
  addNews: (newItem: {
    title: string;
    content: string;
    image: ImageSourcePropType;
    videoUrl?: string;
  }) => NewsItem;
  updateNews: (id: string, updatedData: Partial<NewsItem>) => void;
};

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'A Importância do Flúor na Prevenção de Cáries',
    snippet:
      'Entenda como o flúor fortalece o esmalte dos dentes e protege contra a ação de bactérias...',
    content:
      'O flúor é um mineral natural que desempenha um papel crucial na saúde bucal. Ele atua de duas maneiras principais: fortalecendo o esmalte dos dentes, tornando-os mais resistentes aos ácidos produzidos pelas bactérias, e promovendo a remineralização, que é o processo de reparação do esmalte em estágios iniciais de cárie. É por isso que ele é adicionado à água potável em muitas comunidades e é um ingrediente essencial nas pastas de dente.',
    date: '28 de Ago, 2025',
    image: require('@/assets/images/novidade-1.png'),
  },
  {
    id: '2',
    title: 'Clareamento Dental: Mitos e Verdades',
    snippet:
      'Descubra o que é verdade e o que é mito quando o assunto é deixar os dentes mais brancos...',
    content:
      'O clareamento dental é um dos procedimentos estéticos mais procurados. Um mito comum é que ele enfraquece os dentes, o que não é verdade quando realizado sob a supervisão de um profissional. Outro ponto importante é que clareamentos caseiros sem orientação podem ser perigosos e causar sensibilidade ou danos à gengiva. A verdade é que um clareamento bem-sucedido, seja em consultório ou com moldeiras supervisionadas, pode rejuvenescer o sorriso de forma segura e eficaz.',
    date: '27 de Ago, 2025',
    image: require('@/assets/images/novidade-2.png'),
  },
];

export const useNewsStore = create<NewsState>()(
  persist(
    (set, get) => ({
      news: MOCK_NEWS,

      isHydrated: false,
      hydrate: async () => {
        if (get().isHydrated) return;
        await new Promise((r) => setTimeout(r, 0));
        if (!get().isHydrated) {
          useNewsStore.setState({ isHydrated: true });
        }
      },
      getNewsById: (id) => get().news.find((n) => n.id === id),

      addNews: (newItem) => {
        const now = new Date();
        const dateStr = now.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });

        const snippetBase = newItem.content?.trim() ?? '';
        const snippet =
          snippetBase.length > 100 ? `${snippetBase.substring(0, 100)}...` : snippetBase;

        const item: NewsItem = {
          id: Math.random().toString(36).slice(2, 11),
          title: newItem.title.trim(),
          content: newItem.content.trim(),
          image: newItem.image,
          videoUrl: newItem.videoUrl?.trim() || undefined,
          date: dateStr,
          snippet,
        };

        set((state) => ({ news: [item, ...state.news] }));
        return item;
      },

      updateNews: (id, updatedData) => {
        set((state) => {
          const news = state.news.map((it) => {
            if (it.id !== id) return it;

            const merged: NewsItem = { ...it, ...updatedData };

            if (updatedData.content !== undefined) {
              const base = (updatedData.content ?? '').trim();
              merged.snippet = base.length > 100 ? `${base.substring(0, 100)}...` : base;
            }

            return merged;
          });

          return { news };
        });
      },
    }),
    {
      name: 'app_fake_db_news_v1',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),

      onRehydrateStorage: () => {
        return () => {
          useNewsStore.setState({ isHydrated: true });
        };
      },

      migrate: async (persisted, _version) => {
        return persisted as any;
      },

      partialize: (state) => ({
        news: state.news,
      }),
    }
  )
);

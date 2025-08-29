import { create } from 'zustand';
import { ImageSourcePropType } from 'react-native';

export type NewsItem = {
  id: string;
  title: string;
  snippet: string;
  content: string;
  date: string;
  image: ImageSourcePropType;
};

type NewsState = {
  news: NewsItem[];
  getNewsById: (id: string) => NewsItem | undefined;
  addNews: (newItem: { title: string; content: string; image: ImageSourcePropType }) => NewsItem; // Corrigido para retornar NewsItem
};

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'A Importância do Flúor na Prevenção de Cáries',
    snippet: 'Entenda como o flúor fortalece o esmalte dos dentes e protege contra a ação de bactérias...',
    content: 'O flúor é um mineral natural que desempenha um papel crucial na saúde bucal. Ele atua de duas maneiras principais: fortalecendo o esmalte dos dentes, tornando-os mais resistentes aos ácidos produzidos pelas bactérias, e promovendo a remineralização, que é o processo de reparação do esmalte em estágios iniciais de cárie. É por isso que ele é adicionado à água potável em muitas comunidades e é um ingrediente essencial nas pastas de dente.',
    date: '28 de Ago, 2025',
    image: require('@/assets/images/novidade-1.png'),
  },
  {
    id: '2',
    title: 'Clareamento Dental: Mitos e Verdades',
    snippet: 'Descubra o que é verdade e o que é mito quando o assunto é deixar os dentes mais brancos...',
    content: 'O clareamento dental é um dos procedimentos estéticos mais procurados. Um mito comum é que ele enfraquece os dentes, o que não é verdade quando realizado sob a supervisão de um profissional. Outro ponto importante é que clareamentos caseiros sem orientação podem ser perigosos e causar sensibilidade ou danos à gengiva. A verdade é que um clareamento bem-sucedido, seja em consultório ou com moldeiras supervisionadas, pode rejuvenescer o sorriso de forma segura e eficaz.',
    date: '27 de Ago, 2025',
    image: require('@/assets/images/novidade-2.png'),
  },
];

export const useNewsStore = create<NewsState>((set, get) => ({
  news: MOCK_NEWS,
  getNewsById: (id) => {
    return get().news.find((item) => item.id === id);
  },
  addNews: (newItem) => {
    const newNewsItemWithId: NewsItem = {
      ...newItem,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }),
      snippet: newItem.content.substring(0, 100) + '...',
    };

    set((state) => ({
      news: [newNewsItemWithId, ...state.news],
    }));

    return newNewsItemWithId;
  },
}));

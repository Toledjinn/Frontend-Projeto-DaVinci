import { create } from 'zustand';
import { NewsItemProps } from '@/components/features/NewsListItem';

const MOCK_NEWS: NewsItemProps[] = [
  {
    id: '1',
    image: require('@/assets/images/novidade-1.png'),
    title: 'A Importância do Flúor na Prevenção de Cáries',
    snippet: 'Descubra como o flúor atua no esmalte dos dentes e por que ele é essencial para a sua saúde bucal diária.',
    content: 'O flúor é um mineral natural que fortalece o esmalte dos dentes, tornando-os mais resistentes aos ataques ácidos das bactérias que causam as cáries. Ele atua de duas maneiras: topicamente, quando em contato direto com os dentes através de pastas e bochechos, e sistemicamente, quando ingerido através da água fluoretada. A utilização regular de produtos com flúor é uma das medidas mais eficazes e de baixo custo para a prevenção da cárie dentária em todas as idades.',
    date: '10 de Agosto, 2025',
  },
  {
    id: '2',
    image: require('@/assets/images/novidade-2.png'),
    title: 'Clareamento Dental: Mitos e Verdades',
    snippet: 'Separamos os principais mitos sobre o clareamento dental e explicamos o que realmente funciona para ter um sorriso mais branco.',
    content: 'Muitas pessoas acreditam que receitas caseiras com bicarbonato de sódio ou limão podem clarear os dentes, mas isso é um mito perigoso que pode danificar o esmalte. O clareamento dental seguro e eficaz deve ser sempre realizado com a supervisão de um dentista. Existem duas modalidades principais: o clareamento em consultório, que utiliza géis de alta concentração para resultados rápidos, e o clareamento caseiro supervisionado, que utiliza moldeiras personalizadas e um gel de menor concentração por um período mais longo. Ambos os métodos são seguros e proporcionam excelentes resultados quando bem indicados.',
    date: '05 de Agosto, 2025',
  },
];

type NewsState = {
  news: NewsItemProps[];
  addNews: (newsItem: NewsItemProps) => void;
};

export const useNewsStore = create<NewsState>((set) => ({
  news: MOCK_NEWS,
  addNews: (newsItem) =>
    set((state) => ({
      news: [newsItem, ...state.news],
    })),
}));

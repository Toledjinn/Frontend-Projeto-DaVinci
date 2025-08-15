import { create } from 'zustand';
import { ImageSourcePropType } from 'react-native';

export type LabCarouselItem = {
  id: string;
  title: string;
  text: string;
  image: ImageSourcePropType;
};

type PageName = 'produtos' | 'trabalhos' | 'parceiros';

type LaboratorioState = {
  produtos: LabCarouselItem[];
  trabalhos: LabCarouselItem[];
  parceiros: LabCarouselItem[];
  updatePageContent: (page: PageName, newContent: LabCarouselItem[]) => void;
};

export const useLaboratorioStore = create<LaboratorioState>((set) => ({
  produtos: [
    {
      id: '1',
      title: 'Coroas de Zircônia Pura',
      text: 'Oferecemos coroas de zircônia de alta translucidez, conhecidas pela sua estética natural e resistência superior. Ideais para restaurações anteriores e posteriores.',
      image: require('@/assets/images/produto-1.png'),
    },
    {
      id: '2',
      title: 'Lentes de Contato Dental em Dissilicato de Lítio',
      text: 'As nossas lentes de contato são fabricadas com dissilicato de lítio, proporcionando uma combinação perfeita de durabilidade e uma aparência vibrante e natural para o sorriso.',
      image: require('@/assets/images/produto-2.png'),
    },
  ],
  trabalhos: [
    {
      id: '1',
      title: 'Reabilitação Oral Completa',
      text: 'Caso complexo de reabilitação com implantes e coroas de porcelana, restaurando a função e a estética do sorriso.',
      image: require('@/assets/images/trabalho-1.png'),
    },
    {
      id: '2',
      title: 'Facetas em Resina Composta',
      text: 'Transformação do sorriso através da aplicação de facetas em resina composta, técnica minimamente invasiva com resultados imediatos.',
      image: require('@/assets/images/trabalho-2.png'),
    },
  ],
  parceiros: [
    {
      id: '1',
      title: 'Laboratório Protético ArtSmile',
      text: 'A nossa parceria com o ArtSmile garante trabalhos protéticos de alta precisão e estética, utilizando as mais recentes tecnologias de CAD/CAM.',
      image: require('@/assets/images/parceiro-1.png'),
    },
    {
      id: '2',
      title: 'Dental Supply Co.',
      text: 'Trabalhamos com os melhores materiais do mercado, fornecidos pela Dental Supply Co., assegurando a durabilidade e a qualidade de todos os nossos tratamentos.',
      image: require('@/assets/images/parceiro-2.png'),
    },
  ],

  updatePageContent: (page, newContent) =>
    set((state) => ({
      ...state,
      [page]: newContent,
    })),
}));

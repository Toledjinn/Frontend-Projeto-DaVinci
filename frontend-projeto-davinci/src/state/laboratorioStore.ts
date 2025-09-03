import { create } from 'zustand';
import { ImageSourcePropType } from 'react-native';
export type CarouselSlide = {
  id: string;
  title: string;
  text: string;
  image: ImageSourcePropType;
};
type PageName = 'produtos' | 'trabalhos' | 'parceiros';
type LaboratorioState = {
  pages: Record<PageName, { title: string; slides: CarouselSlide[] }>;
  updateSlide: (page: PageName, slideId: string, newContent: Partial<CarouselSlide>) => void;
  addSlide: (page: PageName) => void;
  removeSlide: (page: PageName, slideId: string) => void;
};

const MOCK_DATA = {
    produtos: {
        title: 'Produtos',
        slides: [
            {
              id: 'prod1',
              title: 'Coroas de Zircônia',
              text: 'Oferecemos coroas de zircônia fresadas com tecnologia CAD/CAM, garantindo uma adaptação perfeita e uma estética natural inigualável.',
              image: require('@/assets/images/produto-1.png'),
            },
            {
              id: 'prod2',
              title: 'Lentes de Contato Dental',
              text: 'Nossas lentes de contato são ultrafinas e resistentes, ideais para transformações do sorriso com mínimo desgaste dental.',
              image: require('@/assets/images/produto-2.png'),
            },
        ],
    },
    trabalhos: {
        title: 'Trabalhos',
        slides: [
            {
                id: 'trab1',
                title: 'Reabilitação Oral Completa',
                text: 'Casos complexos de reabilitação com implantes e próteses totais, devolvendo a função e a estética ao paciente.',
                image: require('@/assets/images/trabalho-1.png'),
            },
            {
                id: 'trab2',
                title: 'Facetas em Resina Composta',
                text: 'Trabalhos artísticos de facetas em resina composta, realizados com técnica estratificada para um resultado natural.',
                image: require('@/assets/images/trabalho-2.png'),
            },
        ],
    },
    parceiros: {
        title: 'Parceiros',
        slides: [
            {
                id: 'parc1',
                title: 'ArtSmile Laboratório Protético',
                text: 'Nosso principal parceiro para trabalhos de prótese, conhecido pela precisão e pelo uso de materiais de ponta.',
                image: require('@/assets/images/parceiro-1.png'),
            },
            {
                id: 'parc2',
                title: 'Dental Supply Co.',
                text: 'Fornecedor oficial de todos os nossos materiais, garantindo a qualidade e a rastreabilidade de resinas, cerâmicas e outros insumos.',
                image: require('@/assets/images/parceiro-2.png'),
            },
        ],
    },
};


export const useLaboratorioStore = create<LaboratorioState>((set) => ({
  pages: MOCK_DATA,

  updateSlide: (page, slideId, newContent) => {
    set((state) => {
      const pageToUpdate = state.pages[page];
      if (pageToUpdate) {
        return {
          pages: {
            ...state.pages,
            [page]: {
              ...pageToUpdate,
              slides: pageToUpdate.slides.map((slide) =>
                slide.id === slideId ? { ...slide, ...newContent } : slide
              ),
            },
          },
        };
      }
      return state;
    });
  },

  addSlide: (page) => {
    set((state) => {
      const pageToUpdate = state.pages[page];
      if (pageToUpdate) {
        const newSlide: CarouselSlide = {
          id: `slide_${Date.now()}`, 
          title: 'Novo Título',
          text: 'Novo texto do slide.',
          image: require('@/assets/images/placeholder.png'), 
        };
        return {
          pages: {
            ...state.pages,
            [page]: {
              ...pageToUpdate,
              slides: [...pageToUpdate.slides, newSlide],
            },
          },
        };
      }
      return state;
    });
  },

  removeSlide: (page, slideId) => {
    set((state) => {
      const pageToUpdate = state.pages[page];
      if (pageToUpdate) {
        if (pageToUpdate.slides.length <= 1) {
          alert('Não é possível remover o último slide.');
          return state;
        }
        return {
          pages: {
            ...state.pages,
            [page]: {
              ...pageToUpdate,
              slides: pageToUpdate.slides.filter((slide) => slide.id !== slideId),
            },
          },
        };
      }
      return state;
    });
  },
}));


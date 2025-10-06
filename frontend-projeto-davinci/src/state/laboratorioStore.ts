import { create } from 'zustand';
import { ImageSourcePropType } from 'react-native';

export type CarouselSlide = {
  id: string;
  title: string;
  text: string;
  image?: ImageSourcePropType;
  videoUrl?: string;
};

export type PageName = 'nossaFilosofia' | 'trabalhos' | 'parceiros';

type LaboratorioState = {
  pages: Record<PageName, { title: string; slides: CarouselSlide[] }>;
  updateSlide: (page: PageName, slideId: string, newContent: Partial<CarouselSlide>) => void;
  addSlide: (page: PageName, layout: 'image' | 'video') => void;
  removeSlide: (page: PageName, slideId: string) => void;
};

const MOCK_DATA = {
    nossaFilosofia: {
        title: 'Nossa Filosofia',
        slides: [
            {
                id: 'prod1',
                title: 'Coroas de Zircônia',
                text: 'Oferecemos coroas de zircônia fresadas com tecnologia CAD/CAM...',
                image: require('@/assets/images/produto-1.png'),
            },
            {
                id: 'prod2',
                title: 'Lentes de Contato Dental',
                text: 'Nossas lentes de contato são ultrafinas e resistentes...',
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
                text: 'Casos complexos de reabilitação com implantes e próteses totais...',
                image: require('@/assets/images/trabalho-1.png'),
            },
            {
                id: 'trab2',
                title: 'Facetas em Resina Composta',
                text: 'Trabalhos artísticos de facetas em resina composta...',
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
                text: 'Nosso principal parceiro para trabalhos de prótese...',
                image: require('@/assets/images/parceiro-1.png'),
            },
            {
                id: 'parc2',
                title: 'Dental Supply Co.',
                text: 'Fornecedor oficial de todos os nossos materiais...',
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

  addSlide: (page, layout) => {
    set((state) => {
      const pageToUpdate = state.pages[page];
      if (pageToUpdate) {
        let newSlide: CarouselSlide = {
          id: `slide_${Date.now()}`, 
          title: 'Novo Título',
          text: 'Novo texto do slide.',
        };

        if (layout === 'image') {
          newSlide.image = require('@/assets/images/placeholder.png');
        } else { 
          newSlide.videoUrl = '';
        }

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


// laboratorioSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageSourcePropType } from 'react-native';

export type CarouselSlide = {
  id: string;
  title: string;
  text: string;
  image?: ImageSourcePropType;
  videoUrl?: string;
};

type PageName = 'produtos' | 'trabalhos' | 'parceiros';

type LaboratorioState = {
  pages: Record<PageName, { title: string; slides: CarouselSlide[] }>;
};

const MOCK_DATA = {
    produtos: {
        title: 'Produtos',
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

const initialState: LaboratorioState = {
  pages: MOCK_DATA,
};

const laboratorioSlice = createSlice({
  name: 'laboratorio',
  initialState,
  reducers: {
    updateSlide: (state, action: PayloadAction<{ page: PageName; slideId: string; newContent: Partial<CarouselSlide> }>) => {
      const { page, slideId, newContent } = action.payload;
      const pageToUpdate = state.pages[page];
      const slideIndex = pageToUpdate.slides.findIndex(slide => slide.id === slideId);
      if (slideIndex !== -1) {
        pageToUpdate.slides[slideIndex] = { ...pageToUpdate.slides[slideIndex], ...newContent };
      }
    },
    addSlide: (state, action: PayloadAction<{ page: PageName; layout: 'image' | 'video' }>) => {
      const { page, layout } = action.payload;
      const newSlide: CarouselSlide = {
        id: `slide_${Date.now()}`,
        title: 'Novo Título',
        text: 'Novo texto do slide.',
        ...(layout === 'image' && { image: require('@/assets/images/placeholder.png') }),
        ...(layout === 'video' && { videoUrl: '' }),
      };
      state.pages[page].slides.push(newSlide);
    },
    removeSlide: (state, action: PayloadAction<{ page: PageName; slideId: string }>) => {
      const { page, slideId } = action.payload;
      const pageToUpdate = state.pages[page];
      if (pageToUpdate.slides.length > 1) {
        pageToUpdate.slides = pageToUpdate.slides.filter(slide => slide.id !== slideId);
      } else {
        console.warn('Não é possível remover o último slide.');
      }
    },
  },
});

export const { updateSlide, addSlide, removeSlide } = laboratorioSlice.actions;

export default laboratorioSlice.reducer;
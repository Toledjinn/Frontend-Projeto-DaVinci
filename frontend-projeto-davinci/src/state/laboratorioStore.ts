import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageSourcePropType } from 'react-native';

export type CarouselSlide = {
  id: string;
  title: string;                
  text: string;                 
  image?: ImageSourcePropType;  
  videoUrl?: string;           
};

export type PageName = 'nossaFilosofia' | 'trabalhos' | 'parceiros';

type PageData = { title: string; slides: CarouselSlide[] };

type LaboratorioState = {
  pages: Record<PageName, PageData>;
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  save: () => Promise<void>;

  updateSlide: (page: PageName, slideId: string, newContent: Partial<CarouselSlide>) => Promise<void>;
  updatePage: (page: PageName, slides: CarouselSlide[]) => Promise<void>;
  addSlide: (page: PageName, layout: 'image' | 'video') => Promise<void>;
  removeSlide: (page: PageName, slideId: string) => Promise<void>;
};

const STORAGE_KEY = '@davinci.laboratorio.v1';

const DEFAULT_DATA: Record<PageName, PageData> = {
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

async function loadFromStorage(): Promise<Record<PageName, PageData>> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<PageName, PageData>) : DEFAULT_DATA;
  } catch (e) {
    console.warn('laboratorioStore.load error:', e);
    return DEFAULT_DATA;
  }
}

async function saveToStorage(data: Record<PageName, PageData>) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('laboratorioStore.save error:', e);
  }
}

export const useLaboratorioStore = create<LaboratorioState>((set, get) => ({
  pages: DEFAULT_DATA,
  isHydrated: false,

  hydrate: async () => {
    const data = await loadFromStorage();
    set({ pages: data, isHydrated: true });
  },

  save: async () => {
    await saveToStorage(get().pages);
  },

  updateSlide: async (page, slideId, newContent) => {
    const state = get();
    const pageData = state.pages[page];
    if (!pageData) return;

    const updatedSlides = pageData.slides.map((s) =>
      s.id === slideId ? { ...s, ...newContent } : s
    );

    const nextPages = { ...state.pages, [page]: { ...pageData, slides: updatedSlides } };
    set({ pages: nextPages });
    await saveToStorage(nextPages);
  },

  updatePage: async (page, slides) => {
    const state = get();
    const pageData = state.pages[page];
    if (!pageData) return;

    const nextPages = { ...state.pages, [page]: { ...pageData, slides } };
    set({ pages: nextPages });
    await saveToStorage(nextPages);
  },

  addSlide: async (page, layout) => {
    const state = get();
    const pageData = state.pages[page];
    if (!pageData) return;

    const id = `slide_${Date.now()}`;
    const newSlide: CarouselSlide =
      layout === 'image'
        ? { id, title: '', text: '', image: { uri: '' } as any }
        : { id, title: '', text: '', videoUrl: '' };

    const nextPages = {
      ...state.pages,
      [page]: { ...pageData, slides: [...pageData.slides, newSlide] },
    };
    set({ pages: nextPages });
    await saveToStorage(nextPages);
  },

  removeSlide: async (page, slideId) => {
    const state = get();
    const pageData = state.pages[page];
    if (!pageData) return;

    if (pageData.slides.length <= 1) {
      console.warn('Não é possível remover o último slide.');
      return;
    }

    const nextPages = {
      ...state.pages,
      [page]: { ...pageData, slides: pageData.slides.filter((s) => s.id !== slideId) },
    };
    set({ pages: nextPages });
    await saveToStorage(nextPages);
  },
}));

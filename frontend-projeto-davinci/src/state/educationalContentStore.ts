import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageSourcePropType } from 'react-native';

export type CarouselSlide = {
  id: string;
  title?: string;
  text?: string[];
  quote?: string;
  author?: string;
  text1?: string;
  text2?: string;
  listTitle?: string;
  bulletPoints?: string[];
  image?: ImageSourcePropType;
  images?: ImageSourcePropType[];
  collageImages?: ImageSourcePropType[];
  beforeAfterImages?: { before: ImageSourcePropType; after: ImageSourcePropType };
  imageGrid?: ImageSourcePropType[];
  videoUrl?: string;
};

export type PageName =
  | 'chefinho'
  | 'escova'
  | 'pasta'
  | 'fio-dental'
  | 'fluor'
  | 'revelador-de-placa';

type EducationalContentState = {
  pages: Record<PageName, CarouselSlide[]>;
  isHydrated: boolean;
  hydrate: () => Promise<void>;

  updatePage: (page: PageName, newSlides: CarouselSlide[]) => Promise<void>;

  addSlide: (page: PageName, layoutKey: string) => Promise<void>;
  removeSlide: (page: PageName, slideId: string) => Promise<void>;
};

const STORAGE_KEY = '@davinci.educational.v1';

const DEFAULT_PAGES: Record<PageName, CarouselSlide[]> = {
  chefinho: [
    {
      id: '1',
      image: require('@/assets/images/peter-dawson.jpg'),
      quote:
        '“Qualquer condição que impeça uma limpeza detalhada de qualquer superfície dentária ou de qualquer porção do sulco gengival deve ser considerado um fator causador que pode levar a perda dentária.“',
      author: '- Peter Dawson',
    },
    {
      id: '2',
      image: require('@/assets/images/kit-box.png'),
      text1:
        'Nós somos promotores da saúde, na verdade manejadores de conhecimentos, recursos e estratégias que visam a promoção da saúde, o controle das doenças, o tratamento adequado a manutenção de longo prazo e admiradores da estética do sorriso.',
      text2:
        'Criamos o kit (missão cumprida) que funcionará como um link entre nós e vocês como lembranças entre as revisões.',
    },
    {
      id: '3',
      listTitle: 'Autocuidado, manutenção e produtos de higiene oral.',
      bulletPoints: [
        'A escolha dos produtos de higiene oral será baseada nos benefícios que pretendemos alcançar e a individualização é a chave para uma prescrição adequada.',
        'É comum o paciente seguir os cuidados propostos logo após o tratamento e, ao longo do tempo, retornar aos hábitos de higienização anteriormente praticados.',
      ],
    },
  ],
  escova: [
    {
      id: '1',
      image: require('@/assets/images/gengivite-periodontite.png'),
      title: 'Olá, sou a Escova!',
      text: [
        'Minha principal função é remover restos de alimentos, pigmentos e, principalmente, desorganizar a placa bacteriana que se acumula sobre as superfícies livres (da frente e de trás) e oclusal dos dentes.',
      ],
    },
  ],
  pasta: [
    {
      id: '1',
      title: 'Sou a Pasta de Dente!',
      text: [
        'E, levada e esfregada pela escova, tenho a função de facilitar a remoção do excesso de placa dental e remover os pigmentos da superfície do dente. Também, e principalmente, ao incorporar o parceiro flúor em minha composição, ajudo na proteção dos dentes contra a desmineralização.',
      ],
      images: [
        require('@/assets/images/dentes-pigmentados.png'),
        require('@/assets/images/mm2-placa.png'),
        require('@/assets/images/escova-com-pasta.png'),
      ],
    },
  ],
  'fio-dental': [
    {
      id: '1',
      title: 'Sou o Fio Dental!',
      text: [
        'E meu papel é remover restos alimentares e desorganizar a placa bacteriana da região interproximal (entre os dentes), área que as cerdas da escova não alcançam.',
      ],
      image: require('@/assets/images/espaco-biologico.png'),
    },
  ],
  fluor: [
    {
      id: '1',
      text: [
        'Sou importante demais na prevenção da cárie e meu principal papel é fazer com que os dentes sejam mais resistentes aos ácidos produzidos pelas bactérias do biofilme. Se estou presente no meio bucal consigo reduzir a perda de mineral nos momentos em que o ambiente fica ácido (após a ingestão de alimentos, por exemplo) e acelerar o processo de remineralização entre as refeições/lanches.',
      ],
    },
  ],
  'revelador-de-placa': [
    {
      id: '1',
      title: 'Sou o Revelador de Placa!',
      text: [
        'Ainda pouco conhecido, o revelador ou evidenciador de placa bacteriana, tem função essencial na identificação da placa ou biofilme dental. A placa ou biofilme é uma camada fina, transparente que recobri todos os dentes do paciente. Tudo se resume a ela, seu acúmulo é capaz de causar cárie, gengivite e tártaro.',
      ],
      image: require('@/assets/images/revelador-antes-depois.png'),
    },
  ],
};

async function loadFromStorage(): Promise<Record<PageName, CarouselSlide[]>> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<PageName, CarouselSlide[]>) : DEFAULT_PAGES;
  } catch (e) {
    console.warn('educationalStore.load error:', e);
    return DEFAULT_PAGES;
  }
}

async function saveToStorage(pages: Record<PageName, CarouselSlide[]>) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  } catch (e) {
    console.warn('educationalStore.save error:', e);
  }
}

export const useEducationalContentStore = create<EducationalContentState>((set, get) => ({
  pages: DEFAULT_PAGES,
  isHydrated: false,

  hydrate: async () => {
    const saved = await loadFromStorage();
    set({ pages: saved, isHydrated: true });
  },

  updatePage: async (page, newSlides) => {
    const next = { ...get().pages, [page]: newSlides };
    set({ pages: next });
    await saveToStorage(next);
  },

  addSlide: async (page, layoutKey) => {
    const pages = get().pages;
    const pageToUpdate = pages[page];
    if (!pageToUpdate) return;

    const id = `slide_${Date.now()}`;
    const placeholder = require('@/assets/images/placeholder.png');

    let newSlide: CarouselSlide = { id };
    switch (layoutKey) {
      case 'text':
        newSlide = { id, title: 'Novo Título', text: ['Novo texto...'] };
        break;
      case 'video':
        newSlide = { id, title: 'Novo vídeo', text: ['Descrição...'], videoUrl: '' };
        break;
      case 'image':
        newSlide = { id, title: 'Novo slide com imagem', image: placeholder, text: ['Legenda opcional...'] };
        break;
      case 'quote':
        newSlide = { id, quote: '“Nova citação...”', author: '' };
        break;
      case 'list':
        newSlide = { id, listTitle: 'Nova lista', bulletPoints: ['Item 1', 'Item 2'] };
        break;
      default:
        newSlide = { id, title: 'Novo Título', text: ['Novo texto...'], image: placeholder };
        break;
    }

    const next = { ...pages, [page]: [...pageToUpdate, newSlide] };
    set({ pages: next });
    await saveToStorage(next);
  },

  removeSlide: async (page, slideId) => {
    const pages = get().pages;
    const pageToUpdate = pages[page];
    if (!pageToUpdate) return;

    if (pageToUpdate.length <= 1) {
      console.warn('Não é possível remover o último slide.');
      return;
    }

    const next = { ...pages, [page]: pageToUpdate.filter((s) => s.id !== slideId) };
    set({ pages: next });
    await saveToStorage(next);
  },
}));

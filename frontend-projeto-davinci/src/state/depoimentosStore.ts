import { create } from 'zustand';

export type DepoimentoItem = {
  id: string;
  author: string;
  text: string;
  videoUrl?: string | null;
};

type DepoimentosState = {
  depoimentos: DepoimentoItem[];
  addDepoimento: (depoimento: Omit<DepoimentoItem, 'id'>) => void;
  updateDepoimento: (id: string, newContent: Partial<DepoimentoItem>) => void;
  removeDepoimento: (id: string) => void;
};

const MOCK_DEPOIMENTOS: DepoimentoItem[] = [
  {
    id: 'dep1',
    author: 'Maria S., Paciente',
    text: 'O tratamento transformou meu sorriso e minha autoestima. A equipe foi incrível do início ao fim, sou muito grata!',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
  },
  {
    id: 'dep2',
    author: 'João P., Paciente',
    text: 'Nunca imaginei que poderia voltar a sorrir com tanta confiança. O projeto DaVinci Social mudou minha vida.',
    videoUrl: null,
  },
];

export const useDepoimentosStore = create<DepoimentosState>((set) => ({
  depoimentos: MOCK_DEPOIMENTOS,

  addDepoimento: (depoimento) => {
    set((state) => ({
      depoimentos: [
        ...state.depoimentos,
        { ...depoimento, id: `dep_${Date.now()}` },
      ],
    }));
  },

  updateDepoimento: (id, newContent) => {
    set((state) => ({
      depoimentos: state.depoimentos.map((item) =>
        item.id === id ? { ...item, ...newContent } : item
      ),
    }));
  },

  removeDepoimento: (id) => {
    set((state) => ({
      depoimentos: state.depoimentos.filter((item) => item.id !== id),
    }));
  },
}));

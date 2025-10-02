import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DepoimentoItem = {
  id: string;
  author: string;
  text: string;
  videoUrl?: string | null;
};

type DepoimentosState = {
  depoimentos: DepoimentoItem[];
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

const initialState: DepoimentosState = {
  depoimentos: MOCK_DEPOIMENTOS,
};

const depoimentosSlice = createSlice({
  name: 'depoimentos',
  initialState,
  reducers: {
    addDepoimento: (state, action: PayloadAction<Omit<DepoimentoItem, 'id'>>) => {
      state.depoimentos.push({ ...action.payload, id: `dep_${Date.now()}` });
    },
    updateDepoimento: (state, action: PayloadAction<{ id: string; newContent: Partial<DepoimentoItem> }>) => {
      const { id, newContent } = action.payload;
      const index = state.depoimentos.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.depoimentos[index] = { ...state.depoimentos[index], ...newContent };
      }
    },
    removeDepoimento: (state, action: PayloadAction<string>) => {
      state.depoimentos = state.depoimentos.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addDepoimento, updateDepoimento, removeDepoimento } = depoimentosSlice.actions;

export default depoimentosSlice.reducer;
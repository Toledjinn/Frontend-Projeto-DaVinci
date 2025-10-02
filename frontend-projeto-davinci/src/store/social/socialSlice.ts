// socialSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageSourcePropType } from 'react-native';

export type ContentBlock = {
  id: string;
  type: 'text' | 'image' | 'video';
  content?: string;
  image?: ImageSourcePropType;
  videoUrl?: string;
};

type PageName = 'oQueE' | 'comoParticipar';

type SocialState = {
  pages: Record<PageName, ContentBlock[]>;
};

const initialState: SocialState = {
  pages: {
    oQueE: [
      {
        id: 'oqe_1',
        type: 'text',
        content: 'O DaVinci Social é uma extensão do Projeto DaVinci, realizado pela Gratone Odontologia Especializada.',
      },
      {
        id: 'oqe_2',
        type: 'text',
        content: 'Sua finalidade é atender pacientes que não possuem condições de pagar por um tratamento odontológico adequado, visando restabelecer a estética e a função bucal de forma digna.',
      },
    ],
    comoParticipar: [
      {
        id: 'cp_1',
        type: 'text',
        content: 'É realizado um sorteio entre os pacientes ativos na clínica, onde o selecionado indica uma pessoa de seu convívio, que não teria condições financeiras de fazer um tratamento odontológico completo.',
      },
      {
        id: 'cp_2',
        type: 'text',
        content: 'Esse paciente será atendido por todos os profissionais que atuam na clínica (atendimento interdisciplinar) ou que são parceiros indiretos, com apoio de toda a nossa infraestrutura, equipamentos e materiais, como qualquer paciente que paga por um tratamento particular.',
      },
      {
        id: 'cp_3',
        type: 'text',
        content: 'Assim que finalizarmos cada caso, fazemos um novo sorteio e inicia-se outro gratuitamente.',
      },
      {
        id: 'cp_4',
        type: 'text',
        content: 'Essa é uma pequena contribuição que fazemos com muito amor e carinho, pois são pessoas trabalhadoras e gente do bem, porém, sem acesso pleno à saúde bucal, em razão de uma desigualdade social que afeta fortemente nosso amado Brasil',
      },
    ],
  },
};

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    updateBlock: (state, action: PayloadAction<{ page: PageName; blockId: string; newContent: Partial<ContentBlock> }>) => {
      const { page, blockId, newContent } = action.payload;
      const blocks = state.pages[page];
      const blockIndex = blocks.findIndex(block => block.id === blockId);
      if (blockIndex !== -1) {
        blocks[blockIndex] = { ...blocks[blockIndex], ...newContent };
      }
    },
    addBlock: (state, action: PayloadAction<{ page: PageName; type: 'text' | 'image' | 'video' }>) => {
      const { page, type } = action.payload;
      let newBlock: ContentBlock;

      if (type === 'text') {
        newBlock = {
          id: `block_${Date.now()}`,
          type: 'text',
          content: 'Novo parágrafo...',
        };
      } else if (type === 'image') {
        newBlock = {
          id: `block_${Date.now()}`,
          type: 'image',
          image: require('@/assets/images/placeholder.png'),
        };
      } else {
        newBlock = {
          id: `block_${Date.now()}`,
          type: 'video',
          videoUrl: '',
        };
      }
      state.pages[page].push(newBlock);
    },
    removeBlock: (state, action: PayloadAction<{ page: PageName; blockId: string }>) => {
      const { page, blockId } = action.payload;
      state.pages[page] = state.pages[page].filter(block => block.id !== blockId);
    },
  },
});

export const { updateBlock, addBlock, removeBlock } = socialSlice.actions;

export default socialSlice.reducer;
import { create } from 'zustand';
import { ImageSourcePropType } from 'react-native';
import React from 'react';
export type ContentBlock = {
  id: string;
  type: 'text' | 'image';
  content?: string; 
  image?: ImageSourcePropType; 
};

type PageName = 'oQueE' | 'comoParticipar';
type SocialState = {
  pages: Record<PageName, ContentBlock[]>;
  updateBlock: (page: PageName, blockId: string, newContent: Partial<ContentBlock>) => void;
  addBlock: (page: PageName, type: 'text' | 'image') => void;
  removeBlock: (page: PageName, blockId: string) => void;
};

export const useSocialStore = create<SocialState>((set) => ({
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
      }
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

  updateBlock: (page, blockId, newContent) => {
    set((state) => ({
      pages: {
        ...state.pages,
        [page]: state.pages[page].map((block) =>
          block.id === blockId ? { ...block, ...newContent } : block
        ),
      },
    }));
  },
  
  addBlock: (page, type) => {
    set((state) => {
      const newBlock: ContentBlock = {
        id: `block_${Date.now()}`,
        type,
        content: type === 'text' ? 'Novo parágrafo...' : undefined,
        image: type === 'image' ? require('@/assets/images/placeholder.png') : undefined,
      };
      return {
        pages: {
          ...state.pages,
          [page]: [...state.pages[page], newBlock],
        },
      };
    });
  },

  removeBlock: (page, blockId) => {
    set((state) => ({
      pages: {
        ...state.pages,
        [page]: state.pages[page].filter((block) => block.id !== blockId),
      },
    }));
  },
}));

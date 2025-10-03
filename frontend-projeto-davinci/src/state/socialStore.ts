import { create } from 'zustand';
import { ImageSourcePropType } from 'react-native';


export type ContentBlock = {
  id: string;
  type: 'text' | 'image' | 'video';
  content?: string;
  image?: ImageSourcePropType;
  videoUrl?: string;
};

export type DepoimentoItem = {
  id: string;
  type: 'depoimento'; 
  author: string;
  text: string;
  videoUrl?: string | null;
};

export type SocialContent = ContentBlock | DepoimentoItem;


export type PageName = 'oQueE' | 'comoParticipar' | 'depoimentos';


type SocialState = {
  pages: Record<PageName, SocialContent[]>;
  updatePage: (page: PageName, newContent: SocialContent[]) => void;
  addBlock: (page: PageName, type: 'text' | 'image' | 'video' | 'depoimento') => void;
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
    depoimentos: [
      {
        id: 'dep1',
        type: 'depoimento',
        author: 'Maria S., Paciente',
        text: 'O tratamento transformou meu sorriso e minha autoestima. A equipe foi incrível do início ao fim, sou muito grata!',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
      {
        id: 'dep2',
        type: 'depoimento',
        author: 'João P., Paciente',
        text: 'Nunca imaginei que poderia voltar a sorrir com tanta confiança. O projeto DaVinci Social mudou minha vida.',
        videoUrl: null,
      },
    ],
  },


  updatePage: (page, newContent) => {
    set((state) => ({
      pages: {
        ...state.pages,
        [page]: newContent,
      },
    }));
  },

  addBlock: (page, type) => {
    set((state) => {
      let newBlock: SocialContent;

      if (type === 'depoimento') {
        newBlock = {
          id: `dep_${Date.now()}`,
          type: 'depoimento',
          author: 'Novo Autor',
          text: 'Novo depoimento...',
          videoUrl: '',
        };
      } else if (type === 'text') {
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


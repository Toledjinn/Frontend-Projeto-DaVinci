import { create } from 'zustand';

type SimpleContentPage = {
  paragraphs: string[];
};

type PageName = 'oQueE' | 'comoParticipar';

type SocialState = {
  oQueE: SimpleContentPage;
  comoParticipar: SimpleContentPage;
  updateSocialPage: (page: PageName, newParagraphs: string[]) => void;
};

export const useSocialStore = create<SocialState>((set) => ({
  oQueE: {
    paragraphs: [
      'O DaVinci Social é uma extensão do Projeto DaVinci, realizado pela Gratone Odontologia Especializada.',
      'Sua finalidade é atender pacientes que não possuem condições de pagar por um tratamento odontológico adequado, visando restabelecer a estética e a função bucal de forma digna.',
    ],
  },
  comoParticipar: {
    paragraphs: [
        'É realizado um sorteio entre os pacientes ativos na clínica, onde o selecionado indica uma pessoa de seu convívio, que não teria condições financeiras de fazer um tratamento odontológico completo.',
        'Esse paciente será atendido por todos os profissionais que atuam na clínica (atendimento interdisciplinar) ou que são parceiros indiretos, com apoio de toda a nossa infraestrutura, equipamentos e materiais, como qualquer paciente que paga por um tratamento particular.',
        'Assim que finalizarmos cada caso, fazemos um novo sorteio e inicia-se outro gratuitamente.',
        'Essa é uma pequena contribuição que fazemos com muito amor e carinho, pois são pessoas trabalhadoras e gente do bem, porém, sem acesso pleno à saúde bucal, em razão de uma desigualdade social que afeta fortemente nosso amado Brasil',
    ],
  },
  updateSocialPage: (page, newParagraphs) =>
    set((state) => ({
      ...state,
      [page]: { ...state[page], paragraphs: newParagraphs },
    })),
}));
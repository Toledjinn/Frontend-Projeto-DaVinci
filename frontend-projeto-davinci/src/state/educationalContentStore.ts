import { create } from 'zustand';
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
};

type PageName = 'chefinho' | 'escova' | 'pasta' | 'fioDental' | 'fluor' | 'revelador';

type EducationalContentState = {
  pages: Record<PageName, CarouselSlide[]>;
  updatePage: (page: PageName, newSlides: CarouselSlide[]) => void;
  addSlide: (page: PageName, layoutKey: string) => void;
  removeSlide: (page: PageName, slideId: string) => void;
};

export const useEducationalContentStore = create<EducationalContentState>((set) => ({
  pages: {
    chefinho: [
      {
        id: '1',
        image: require('@/assets/images/peter-dawson.jpg'),
        quote: '“Qualquer condição que impeça uma limpeza detalhada de qualquer superfície dentária ou de qualquer porção do sulco gengival deve ser considerado um fator causador que pode levar a perda dentária.“',
        author: '- Peter Dawson',
      },
      {
        id: '2',
        image: require('@/assets/images/kit-box.png'), 
        text1: 'Nós somos promotores da saúde, na verdade manejadores de conhecimentos, recursos e estratégias que visam a promoção da saúde, o controle das doenças, o tratamento adequado a manutenção de longo prazo e admiradores da estética do sorriso.',
        text2: 'Criamos o kit (missão cumprida) que funcionará como um link entre nós e vocês como lembranças entre as revisões.',
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
            text: ['Minha principal função é remover restos de alimentos, pigmentos e, principalmente, desorganizar a placa bacteriana que se acumula sobre as superfícies livres (da frente e de trás) e oclusal dos dentes.'],
          },
          {
            id: '2',
            image: require('@/assets/images/gengivite-periodontite.png'), 
            title: 'Olá, sou a Escova!',
            text: [
              'Essa desorganização constante que faço da placa dificulta que os microorganismos se organizem a ponto dela se tornar cariogênica e de provocar danos aos dentes e ao periodonto (gengiva e osso que circundam os dentes).',
            ],
          },
          {
            id: '3',
            text: [
              'Minhas cerdas devem ser preferencialmente macias e utilizadas de forma a alcançar todas as áreas dos dentes possíveis, inclusive a entrada do sulco gengival.',
            ],
            beforeAfterImages: {
              before: require('@/assets/images/antes.png'),
              after: require('@/assets/images/depois.png'),
            }
          },
          {
            id: '4',
            text: [
              'Deve-se ressaltar que as características das cerdas e tufos das escovas (quantidade, distribuição, material e dureza) influenciam no potencial abrasivo.',
              'A maior quantidade de cerdas, distribuição mais homogênea e cerdas mais macias podem diminuir o potencial abrasivo da escova, pois aumentam a área de contato e ainda melhora a capacidade de limpeza.',
            ],
            beforeAfterImages: {
              before: require('@/assets/images/antes.png'),
              after: require('@/assets/images/depois.png'),
            }
          },
          {
            id: '5',
            image: require('@/assets/images/escova-sorriso.png'), 
            text: [
              'Devo ser utilizada de 2 a 3 vezes por dia, com técnica e tempos adequados, sempre acompanhada de uma pasta de dentes que contenha flúor.',
            ],
          },
        
          {
            id: '6',
            listTitle: 'O que é importante e devemos entender!',
            bulletPoints: [
              'Cerdas sempre macias ou extras macias.',
              'Revezamento diário.',
              'Não escovar imediatamente após as refeições.',
              'Aguardar 25 min após lavar a boca com H²O corrente de manhã.',
              'Usar a pasta dental com o RDA correto (Informe com seu dentista).',
              
            ],
          },
        
          {
            id: '7',
            listTitle: 'O que é importante e devemos entender!',
            bulletPoints: [
              'A escova elétrica é uma boa opção para todas as situações.',
              'Escovas unitufos, são recomendadas para pacientes com dentes mal posicionados.',
              'Pacientes com problemas periodontais ou implantes dentários pode ser indicado escovas interdentais devendo selecionar o calibrador correto para cada caso.',
              'A troca da escova deverá acontecer a cada três meses.',
            ],
          },
    ],
    pasta: [
        {
            id: '1',
            title: 'Sou a Pasta de Dente!',
            text: ['E, levada e esfregada pela escova, tenho a função de facilitar a remoção do excesso de placa dental e remover os pigmentos da superfície do dente. Também, e principalmente, ao incorporar o parceiro flúor em minha composição, ajudo na proteção dos dentes contra a desmineralização.'],
            images: [
              require('@/assets/images/dentes-pigmentados.png'),
              require('@/assets/images/mm2-placa.png'),
              require('@/assets/images/escova-com-pasta.png'),
            ],
          },
          {
            id: '2',
            text1: 'Além de colaborar na saúde bucal, promovo uma sensação de boca limpa agradável e ajudo a combater o mau hálito. De acordo com necessidades especiais de cada um, posso ter minha formulação alterada para combater outros problemas específicos (excesso de tártaro, hipersensibilidade dentinária,...)',
            text2: 'Não esqueça de conversar sobre qual a minha composição ideal para o seu caso com o seu dentista.',
            collageImages: [
              require('@/assets/images/juliana-paes.png'),
              require('@/assets/images/sorriso-1.png'),
              require('@/assets/images/sorriso-2.png'),
            ]
          },
          {
            id: '3',
            listTitle: 'O que é importante e devemos entender!',
            bulletPoints: [
              'O flúor é imprescindível na pasta.',
              'O RDA é um índice de abrasividade que não pode ser maior que 250 (capacidade de limpeza). Em pacientes com restaurações deve ser inferior a 100.',
              'Importante também o RDA baixo em lesões de mancha branca, LCNC ou após alimentações acidas.',
            ]
          },
          {
            id: '4',
            listTitle: 'O que é importante e devemos entender!',
            bulletPoints: [
              'O RDA é apenas um dos fatores a serem considerados.',
              'Cuidado com as superfícies parcialmente desmineralizadas.',
              'Pastas com 5000 PPM de flúor são recomendadas para pacientes com alto índice de cárie ou pacientes com xerostomia e alto índice carie radicular.',
            ]
          },
    ],
    fioDental: [
        {
            id: '1',
            title: 'Sou o Fio Dental!',
            text: [
              'E meu papel é remover restos alimentares e desorganizar a placa bacteriana da região interproximal (entre os dentes), área que as cerdas da escova não alcançam.',
            ],
            image: require('@/assets/images/espaco-biologico.png'),
          },
          {
            id: '2',
            title: 'Sou o Fio Dental!',
            text: [
              'Como minha ação é mecânica, devo, após ser inserido entre dois dentes, ser arrastado contra a face lateral de um dente e, depois, contra a face lateral do dente vizinho. Importante me levar até dentro do sulco gengival.',
              'A recomendação é que eu seja utilizado uma vez ao dia.',
            ],
            image: require('@/assets/images/espaco-biologico.png'),
          },
          {
            id: '3',
            imageGrid: [
              require('@/assets/images/fio-dental-img-1.png'),
              require('@/assets/images/fio-dental-img-2.png'),
              require('@/assets/images/fio-dental-img-3.png'),
              require('@/assets/images/fio-dental-img-4.png'),
              require('@/assets/images/fio-dental-img-5.png'),
              require('@/assets/images/fio-dental-img-6.png'),
              require('@/assets/images/fio-dental-img-7.png'),
            ]
          }
    ],
    fluor: [
        {
            id: '1',
            text: [
              'Sou importante demais na prevenção da cárie e meu principal papel é fazer com que os dentes sejam mais resistentes aos ácidos produzidos pelas bactérias do biofilme. Se estou presente no meio bucal consigo reduzir a perda de mineral nos momentos em que o ambiente fica ácido (após a ingestão de alimentos, por exemplo) e acelerar o processo de remineralização entre as refeições/lanches.',
            ],
          },
          {
            id: '2',
            text: [
              'Assim, sou incorporado na água de abastecimento e nas pastas de dente para estar a toda hora disponível. Nas pastas, sempre devo ter uma concentração de ao menos 1000ppm de flúor. Para a maioria dos pacientes, minha baixa concentração e alta frequência de uso (na água e na pasta) garantem boa proteção frente à doença cárie.',
            ],
          },
          {
            id: '3',
            text: [
              'Em alguns casos, eu, flúor, também posso ser utilizado sob a forma de bochechos, géis ou vernizes aplicados sobre os dentes. Converse com seu dentista sobre a melhor forma como eu posso lhe ajudar a manter uma ótima saúde bucal!',
            ],
          },
          {
            id: '4',
            listTitle: 'O que é importante e devemos entender!',
            bulletPoints: [
              'A cárie é profundamente influenciada pela exposição do fluoreto, que reduz a desmineralização e aumenta a remineralização.',
              'O fluoreto reduz a progressão da cárie (desde os estágios iniciais até os estágios mais avançados), independente do fator da taxa de progressão ser lenta, moderada ou rápida.',
            ],
          },
          {
            id: '5',
            listTitle: 'O que é importante e devemos entender!',
            bulletPoints: [
              'A cárie não é a única doença oral relacionada à desmineralização. A erosão dentária, causada pela ação direta de ácidos sobre as superfícies dentárias sem ação de bactérias, resultada em desgaste aumentado.',
              'Mesmo com o uso de dentifrícios fluoretados pela maior parte das pessoas, a incidência de bio corrosão tem aumentado, devido à ação de ácidos, de origem endogena e exogena, no meio bucal.',
            ],
          },
    ],
    revelador: [
        {
            id: '1',
            title: 'Sou o Revelador de Placa!',
            text: [
              'Ainda pouco conhecido, o revelador ou evidenciador de placa bacteriana, tem função essencial na identificação da placa ou biofilme dental. A placa ou biofilme é uma camada fina, transparente que recobri todos os dentes do paciente. Tudo se resume a ela, seu acúmulo é capaz de causar cárie, gengivite e tártaro.',
            ],
            image: require('@/assets/images/revelador-antes-depois.png'),
          },
          {
            id: '2',
            title: 'Sou o Revelador de Placa!',
            text: [
              'O biofilme é uma aglomeração de bactérias e resíduos alimentares que combinados são muito prejudiciais a saúde bucal, causando mau hálito, gengivite, periodontite, e seu controle, deverá ser feito diariamente com o uso de acessórios de higiene bucal corretamente, como a escova e o fio dental.',
            ],
            image: require('@/assets/images/revelador-antes-depois.png'),
          },
          {
            id: '3',
            title: 'Sou o Revelador de Placa!',
            text: [
              'O revelador que indicamos, evidencia o biofilme com dois indicadores cromáticos, a placa antiga com a cor azul e a placa nova vermelho.',
            ],
            image: require('@/assets/images/revelador-antes-depois.png'),
          },
          {
            id: '4',
            listTitle: 'O que é importante e devemos entender!',
            bulletPoints: [
              'Se tiveres muitas restaurações usar inicialmente no dentista para ver o qual de manchamento.',
              'À medida que for melhorando a desfrise da escovação e tendo um melhor controle, espaçar mais as utilizações.',
              'Não deixe de frequentar as reconsultas para um acompanhamento profissional.',
            ],
          },
    ],
  },

  updatePage: (page, newSlides) =>
    set((state) => ({
      pages: {
        ...state.pages,
        [page]: newSlides,
      },
    })),
  addSlide: (page, layoutKey) => {
    set((state) => {
      const pageToUpdate = state.pages[page];
      if (pageToUpdate) {
        let newSlide: CarouselSlide = { id: `slide_${Date.now()}` };

        switch (layoutKey) {
          case 'quote':
            newSlide = { ...newSlide, quote: '', author: '', image: require('@/assets/images/placeholder.png') };
            break;
          case 'text_duo':
            newSlide = { ...newSlide, text1: '', text2: '', image: require('@/assets/images/placeholder.png') };
            break;
          case 'list':
            newSlide = { ...newSlide, listTitle: 'Novo Título da Lista', bulletPoints: ['Novo tópico'] };
            break;
          case 'before_after':
            newSlide = { ...newSlide, text: [''], beforeAfterImages: { before: require('@/assets/images/placeholder.png'), after: require('@/assets/images/placeholder.png') } };
            break;
          case 'image_grid':
            newSlide = { ...newSlide, imageGrid: Array(7).fill(require('@/assets/images/placeholder.png')) };
            break;
          case 'image_grid_pasta':
            newSlide = { ...newSlide, title: 'Novo Título', text: [''], images: Array(3).fill(require('@/assets/images/placeholder.png')) };
            break;
          case 'collage':
            newSlide = { ...newSlide, text1: '', text2: '', collageImages: Array(3).fill(require('@/assets/images/placeholder.png')) };
            break;
          default:
            newSlide = { ...newSlide, title: 'Novo Título', text: ['Novo texto.'], image: require('@/assets/images/placeholder.png') };
            break;
        }

        return {
          pages: {
            ...state.pages,
            [page]: [...pageToUpdate, newSlide],
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
        if (pageToUpdate.length <= 1) {
          alert('Não é possível remover o último slide.');
          return state;
        }
        return {
          pages: {
            ...state.pages,
            [page]: pageToUpdate.filter((slide) => slide.id !== slideId),
          },
        };
      }
      return state;
    });
  },
}));


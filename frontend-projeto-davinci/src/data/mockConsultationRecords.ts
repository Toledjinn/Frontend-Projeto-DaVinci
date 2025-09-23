import { ImageSourcePropType } from "react-native";

export type ConsultationRecord = {
  appointmentId: string;
  proceduresPerformed: {
    procedure: string;
    description: string;
  }[];
  images: ImageSourcePropType[];
  xrays: ImageSourcePropType[];
};

const ALL_RECORDS: ConsultationRecord[] = [
  {
    appointmentId: 'appt-1',
    proceduresPerformed: [
      {
        procedure: 'Limpeza',
        description: 'Profilaxia completa com jato de bicarbonato e ultrassom. Paciente relatou sensibilidade no dente 24.'
      },
      {
        procedure: 'Aplicação de Flúor',
        description: 'Aplicação de flúor em gel com verniz para sensibilidade.'
      }
    ],
    images: [require('@/assets/images/placeholder.png')],
    xrays: [require('@/assets/images/placeholder.png')],
  },
  {
    appointmentId: 'appt-3',
    proceduresPerformed: [
      {
        procedure: 'Manutenção de Aparelho Ortodôntico',
        description: 'Realizada a troca dos elásticos (ligaduras) e ajuste do arco superior.'
      }
    ],
    images: [],
    xrays: [],
  },
  {
    appointmentId: 'appt-6',
    proceduresPerformed: [
      {
        procedure: 'Tratamento de Canal',
        description: 'Abertura coronária do dente 16 e remoção do tecido pulpar. Medicação intracanal aplicada. Paciente com muita dor, foi orientado sobre os próximos passos.'
      }
    ],
    images: [],
    xrays: [require('@/assets/images/placeholder.png')],
  },
  {
    appointmentId: 'appt-7',
    proceduresPerformed: [
      {
        procedure: 'Consulta de Rotina',
        description: 'Exame clínico geral, sem detecção de novas cáries. Gengiva saudável.'
      }
    ],
    images: [],
    xrays: [],
  },
  {
    appointmentId: 'appt-9',
    proceduresPerformed: [
      {
        procedure: 'Avaliação para Prótese',
        description: 'Realizada moldagem inicial para estudo de prótese parcial removível.'
      }
    ],
    images: [require('@/assets/images/placeholder.png')],
    xrays: [],
  },
  {
    appointmentId: 'appt-11',
    proceduresPerformed: [
      {
        procedure: 'Aplicação de Botox',
        description: 'Aplicação de toxina botulínica na região da glabela e testa para suavização de rugas de expressão.'
      },
      {
        procedure: 'Preenchimento Labial',
        description: 'Aplicação de ácido hialurônico para contorno e volume dos lábios.'
      }
    ],
    images: [require('@/assets/images/placeholder.png'), require('@/assets/images/placeholder.png')],
    xrays: [],
  },
  {
    appointmentId: 'appt-13',
    proceduresPerformed: [
      {
        procedure: 'Consulta Odontopediátrica',
        description: 'Primeira Consulta da criança, realizada ambientação e profilaxia simples.'
      }
    ],
    images: [],
    xrays: [],
  },
  {
    appointmentId: 'appt-14',
    proceduresPerformed: [
      {
        procedure: 'Restauração Dentária',
        description: 'Remoção de cárie e restauração do dente 26 com resina composta A2.'
      }
    ],
    images: [],
    xrays: [require('@/assets/images/placeholder.png')],
  },
  {
    appointmentId: 'appt-16',
    proceduresPerformed: [
      {
        procedure: 'Raspagem Periodontal',
        description: 'Realizada raspagem e alisamento radicular do quadrante superior direito. Paciente orientado sobre cuidados pós-procedimento.'
      }
    ],
    images: [],
    xrays: [],
  },
  {
    appointmentId: 'appt-17',
    proceduresPerformed: [
      {
        procedure: 'Instalação do Aparelho',
        description: 'Instalação de aparelho ortodôntico fixo metálico no arco superior.'
      }
    ],
    images: [],
    xrays: [],
  },
  {
    appointmentId: 'appt-18',
    proceduresPerformed: [
      {
        procedure: 'Extração de Siso',
        description: 'Extração do dente 38 (siso inferior esquerdo). Procedimento realizado sem intercorrências.'
      }
    ],
    images: [],
    xrays: [require('@/assets/images/placeholder.png')],
  },
  {
    appointmentId: 'appt-19',
    proceduresPerformed: [
      {
        procedure: 'Clareamento Dental',
        description: 'Primeira sessão de clareamento de consultório com peróxido de hidrogênio a 35%.'
      }
    ],
    images: [require('@/assets/images/placeholder.png')],
    xrays: [],
  },
  {
    appointmentId: 'appt-20',
    proceduresPerformed: [
      {
        procedure: 'Profilaxia',
        description: 'Profilaxia e aplicação de flúor. Paciente se comportou bem durante todo o atendimento.'
      }
    ],
    images: [],
    xrays: [],
  },
];

export const getRecordForAppointment = (appointmentId: string): ConsultationRecord | undefined => {
  return ALL_RECORDS.find(rec => rec.appointmentId === appointmentId);
};
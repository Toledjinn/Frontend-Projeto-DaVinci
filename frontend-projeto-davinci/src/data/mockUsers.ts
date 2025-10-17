import { SvgProps } from 'react-native-svg';
import FotoPerfil from '@/assets/images/FotoPerfil.svg';

export type UserProfile = {
  id: string;
  name: string;
  image: React.FC<SvgProps> | null;
  type: 'dentist' | 'admin' | 'patient';
  details: { id: string; label: string; value: string }[];
  role?: string;
  specialties?: string[];
  allergies?: string[];
  riskLevel?: 'baixo' | 'moderado' | 'alto' | 'a_definir';

  authType: 'adm' | 'dentista' | 'paciente';
  login: string;
  password: string;
  photoUri?: string | null;
};

const ALL_USERS: UserProfile[] = [
  {
    id: 'dentist-1',
    name: 'José Maria Gratone',
    image: FotoPerfil,
    type: 'dentist',
    authType: 'dentista',
    login: '11122233344',
    password: '05041961',
    specialties: ['Periodontia', 'Prótese'],
    photoUri: null,
    details: [
      { id: 'd1-1', label: 'Gênero', value: 'Masculino' },
      { id: 'd1-2', label: 'Data de Nascimento', value: '05/04/1961' },
      { id: 'd1-3', label: 'Estado Civil', value: 'Solteiro' },
      { id: 'd1-4', label: 'CPF', value: '111.222.333-44' },
      { id: 'd1-5', label: 'Telefone', value: '(61) 98201-0910' },
      { id: 'd1-6', label: 'E-mail', value: 'jose.gratone@email.com' },
      { id: 'd1-7', label: 'CEP', value: '70711-903' },
      { id: 'd1-8', label: 'Endereço', value: 'SCN Quadra 01 Bloco aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaE' },
      { id: 'd1-9', label: 'Bairro', value: 'Asa Norte' },
      { id: 'd1-10', label: 'Número', value: '501' },
      { id: 'd1-11', label: 'Complemento', value: 'Sala 501' },
      { id: 'd1-12', label: 'Cidade / Estado', value: 'Brasília / DF' },
      { id: 'd1-13', label: 'Nacionalidade', value: 'Brasileira' },
      { id: 'd1-14', label: 'Naturalidade', value: 'Rio de Janeiro / RJ' },
      { id: 'd1-15', label: 'CRO', value: '1234 - DF' },
      { id: 'd1-16', label: 'Especialidades', value: 'Periodontia, Prótese' },
    ],
  },
  {
    id: 'dentist-2',
    name: 'Ana Costa',
    image: null,
    type: 'dentist',
    authType: 'dentista',
    login: '22233344455',
    password: '25061988',
    specialties: ['Ortodontia'],
    photoUri: null,
    details: [
      { id: 'd2-1', label: 'Gênero', value: 'Feminino' },
      { id: 'd2-2', label: 'Data de Nascimento', value: '25/06/1988' },
      { id: 'd2-3', label: 'Estado Civil', value: 'Casada' },
      { id: 'd2-4', label: 'CPF', value: '222.333.444-55' },
      { id: 'd2-5', label: 'Telefone', value: '(61) 99999-0001' },
      { id: 'd2-6', label: 'E-mail', value: 'ana.costa@email.com' },
      { id: 'd2-7', label: 'CEP', value: '71900-100' },
      { id: 'd2-8', label: 'Endereço', value: 'Rua das Flores, 123' },
      { id: 'd2-9', label: 'Bairro', value: 'Águas Claras' },
      { id: 'd2-10', label: 'Número', value: '123' },
      { id: 'd2-11', label: 'Complemento', value: 'Apto 202' },
      { id: 'd2-12', label: 'Cidade / Estado', value: 'Brasília / DF' },
      { id: 'd2-13', label: 'Nacionalidade', value: 'Brasileira' },
      { id: 'd2-14', label: 'Naturalidade', value: 'São Paulo / SP' },
      { id: 'd2-15', label: 'CRO', value: '5678 - DF' },
      { id: 'd2-16', label: 'Especialidades', value: 'Ortodontia' },
    ],
  },
  {
    id: 'admin-1',
    name: 'Fernanda Lima',
    image: null,
    type: 'admin',
    authType: 'adm',
    login: '44455566677',
    password: '15081990',
    role: 'Secretária',
    photoUri: null,
    details: [
      { id: 'a1-1', label: 'Gênero', value: 'Feminino' },
      { id: 'a1-2', label: 'Data de Nascimento', value: '15/08/1990' },
      { id: 'a1-3', label: 'Estado Civil', value: 'Solteira' },
      { id: 'a1-4', label: 'CPF', value: '444.555.666-77' },
      { id: 'a1-5', label: 'Telefone', value: '(61) 99999-0002' },
      { id: 'a1-6', label: 'E-mail', value: 'fernanda.lima@email.com' },
      { id: 'a1-7', label: 'CEP', value: '70354-010' },
      { id: 'a1-8', label: 'Endereço', value: 'SQS 308 Bloco A' },
      { id: 'a1-9', label: 'Bairro', value: 'Asa Sul' },
      { id: 'a1-10', label: 'Número', value: '101' },
      { id: 'a1-11', label: 'Complemento', value: '' },
      { id: 'a1-12', label: 'Cidade / Estado', value: 'Brasília / DF' },
      { id: 'a1-13', label: 'Nacionalidade', value: 'Brasileira' },
      { id: 'a1-14', label: 'Naturalidade', value: 'Brasília / DF' },
      { id: 'a1-15', label: 'Cargo', value: 'Secretária' },
    ],
  },
  {
    id: 'patient-1',
    name: 'Luiz Eduardo de Almeida Toledo Leal',
    image: null,
    type: 'patient',
    authType: 'paciente',
    login: '11122233344',
    password: '05022000',
    allergies: ['Poeira'],
    riskLevel: 'baixo',
    photoUri: null,
    details: [
      { id: 'p1-1', label: 'Gênero', value: 'Masculino' },
      { id: 'p1-2', label: 'Data de Nascimento', value: '05/02/2000' },
      { id: 'p1-3', label: 'Estado Civil', value: 'Solteiro' },
      { id: 'p1-4', label: 'CPF', value: '111.222.333-44' },
      { id: 'p1-5', label: 'Telefone', value: '(61) 99999-0031' },
      { id: 'p1-6', label: 'E-mail', value: 'luiz.toledo@email.com' },
      { id: 'p1-7', label: 'CEP', value: '70670-100' },
      { id: 'p1-8', label: 'Endereço', value: 'Quadra 101, Lote 2' },
      { id: 'p1-9', label: 'Bairro', value: 'Sudoeste' },
      { id: 'p1-10', label: 'Número', value: '2' },
      { id: 'p1-11', label: 'Complemento', value: 'Apto 101' },
      { id: 'p1-12', label: 'Cidade / Estado', value: 'Brasília / DF' },
      { id: 'p1-13', label: 'Nacionalidade', value: 'Brasileira' },
      { id: 'p1-14', label: 'Naturalidade', value: 'Curitiba / PR' },
      { id: 'p1-15', label: 'Alergias', value: 'Nenhuma' },
    ],
  },
  {
    id: 'patient-2',
    name: 'Rafael Ferreira Resende',
    image: null,
    type: 'patient',
    authType: 'paciente',
    login: '22233344455',
    password: '20111985',
    allergies: ['Poeira'],
    riskLevel: 'baixo',
    photoUri: null,
    details: [
      { id: 'p2-1', label: 'Gênero', value: 'Masculino' },
      { id: 'p2-2', label: 'Data de Nascimento', value: '20/11/1985' },
      { id: 'p2-3', label: 'Estado Civil', value: 'Casado' },
      { id: 'p2-4', label: 'CPF', value: '222.333.444-55' },
      { id: 'p2-5', label: 'Telefone', value: '(61) 99999-0004' },
      { id: 'p2-6', label: 'E-mail', value: 'rafael.ferreira@email.com' },
      { id: 'p2-7', label: 'CEP', value: '72120-010' },
      { id: 'p2-8', label: 'Endereço', value: 'Rua 10, Lote 5' },
      { id: 'p2-9', label: 'Bairro', value: 'Vicente Pires' },
      { id: 'p2-10', label: 'Número', value: '123' },
      { id: 'p2-11', label: 'Complemento', value: 'Casa 2' },
      { id: 'p2-12', label: 'Cidade / Estado', value: 'Brasília / DF' },
      { id: 'p2-13', label: 'Nacionalidade', value: 'Brasileira' },
      { id: 'p2-14', label: 'Naturalidade', value: 'Porto Alegre / RS' },
      { id: 'p2-15', label: 'Alergias', value: 'Poeira' },
    ],
  },
];

export const findUserById = (id: string): UserProfile | undefined => {
  return ALL_USERS.find((user) => user.id === id);
};

export const getUsers = (type: 'dentist' | 'admin' | 'patient') => {
  return ALL_USERS.filter((user) => user.type === type);
};

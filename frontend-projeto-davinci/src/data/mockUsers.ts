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
  riskLevel?: 'baixo' | 'moderado' | 'alto';
};

const ALL_USERS: UserProfile[] = [
  { 
    id: 'dentist-1', 
    name: 'José Maria Gratone', 
    image: FotoPerfil,
    type: 'dentist',
    specialties: ['Periodontia', 'Prótese'],
    details: [
      { id: 'd1-1', label: 'Gênero', value: 'Masculino' },
      { id: 'd1-2', label: 'Data de Nascimento', value: '05/04/1961' },
      { id: 'd1-3', label: 'Estado Civil', value: 'Solteiro' },
      { id: 'd1-4', label: 'CPF', value: '111.222.333-44' },
      { id: 'd1-5', label: 'Telefone', value: '(61) 98201-0910' },
      { id: 'd1-6', label: 'E-mail', value: 'jose.gratone@email.com' },
      { id: 'd1-7', label: 'Endereço', value: 'SCN Quadra 01 Bloco E, Sala 501, Asa Norte' },
      { id: 'd1-8', label: 'Cidade / Estado', value: 'Brasília / DF' },
      { id: 'd1-9', label: 'Nacionalidade', value: 'Brasileira' },
      { id: 'd1-10', label: 'Naturalidade', value: 'Rio de Janeiro / RJ' },
      { id: 'd1-11', label: 'CRO', value: '1234 - DF' },
      { id: 'd1-12', label: 'Especialidades', value: 'Periodontia, Prótese' },
    ]
  },
  { 
    id: 'dentist-2', 
    name: 'Ana Costa', 
    image: null,
    type: 'dentist',
    specialties: ['Ortodontia'],
    details: [
        { id: 'd2-1', label: 'Gênero', value: 'Feminino' },
        { id: 'd2-2', label: 'Data de Nascimento', value: '25/06/1988' },
        { id: 'd2-3', label: 'Estado Civil', value: 'Casada' },
        { id: 'd2-4', label: 'CPF', value: '222.333.444-55' },
        { id: 'd2-5', label: 'Telefone', value: '(61) 99999-0001' },
        { id: 'd2-6', label: 'E-mail', value: 'ana.costa@email.com' },
        { id: 'd2-7', label: 'Endereço', value: 'Rua das Flores, 123, Águas Claras' },
        { id: 'd2-8', label: 'Cidade / Estado', value: 'Brasília / DF' },
        { id: 'd2-9', label: 'Nacionalidade', value: 'Brasileira' },
        { id: 'd2-10', label: 'Naturalidade', value: 'São Paulo / SP' },
        { id: 'd2-11', label: 'CRO', value: '5678 - DF' },
        { id: 'd2-12', label: 'Especialidades', value: 'Ortodontia' },
    ]
  },
  { 
    id: 'dentist-3', 
    name: 'Carlos Dias', 
    image: null,
    type: 'dentist',
    specialties: ['Endodontia'],
    details: [
        { id: 'd3-1', label: 'Gênero', value: 'Masculino' },
        { id: 'd3-2', label: 'Data de Nascimento', value: '10/01/1975' },
        { id: 'd3-3', label: 'Estado Civil', value: 'Divorciado' },
        { id: 'd3-4', label: 'CPF', value: '333.444.555-66' },
        { id: 'd3-5', label: 'Telefone', value: '(61) 99999-0011' },
        { id: 'd3-6', label: 'E-mail', value: 'carlos.dias@email.com' },
        { id: 'd3-7', label: 'Endereço', value: 'Avenida Castanheiras, 456, Taguatinga' },
        { id: 'd3-8', label: 'Cidade / Estado', value: 'Brasília / DF' },
        { id: 'd3-9', label: 'Nacionalidade', value: 'Brasileira' },
        { id: 'd3-10', label: 'Naturalidade', value: 'Goiânia / GO' },
        { id: 'd3-11', label: 'CRO', value: '9101 - GO' },
        { id: 'd3-12', label: 'Especialidades', value: 'Endodontia' },
    ]
  },

  { 
    id: 'admin-1', 
    name: 'Fernanda Lima', 
    image: null,
    type: 'admin',
    role: 'Secretária',
    details: [
        { id: 'a1-1', label: 'Gênero', value: 'Feminino' },
        { id: 'a1-2', label: 'Data de Nascimento', value: '15/08/1990' },
        { id: 'a1-3', label: 'Estado Civil', value: 'Solteira' },
        { id: 'a1-4', label: 'CPF', value: '444.555.666-77' },
        { id: 'a1-5', label: 'Telefone', value: '(61) 99999-0002' },
        { id: 'a1-6', label: 'E-mail', value: 'fernanda.lima@email.com' },
        { id: 'a1-7', label: 'Endereço', value: 'SQS 308 Bloco A, Asa Sul' },
        { id: 'a1-8', label: 'Cidade / Estado', value: 'Brasília / DF' },
        { id: 'a1-9', label: 'Nacionalidade', value: 'Brasileira' },
        { id: 'a1-10', label: 'Naturalidade', value: 'Brasília / DF' },
        { id: 'a1-11', label: 'Cargo', value: 'Secretária' },
    ]
  },
  { 
    id: 'admin-2', 
    name: 'Ricardo Souza', 
    image: null,
    type: 'admin',
    role: 'Auxiliar de consultório',
    details: [
        { id: 'a2-1', label: 'Gênero', value: 'Masculino' },
        { id: 'a2-2', label: 'Data de Nascimento', value: '03/03/1995' },
        { id: 'a2-3', label: 'Estado Civil', value: 'Solteiro' },
        { id: 'a2-4', label: 'CPF', value: '555.666.777-88' },
        { id: 'a2-5', label: 'Telefone', value: '(61) 99999-0003' },
        { id: 'a2-6', label: 'E-mail', value: 'ricardo.souza@email.com' },
        { id: 'a2-7', label: 'Endereço', value: 'QNA 52, Lote 10, Taguatinga Norte' },
        { id: 'a2-8', label: 'Cidade / Estado', value: 'Brasília / DF' },
        { id: 'a2-9', label: 'Nacionalidade', value: 'Brasileira' },
        { id: 'a2-10', label: 'Naturalidade', value: 'Anápolis / GO' },
        { id: 'a2-11', label: 'Cargo', value: 'Auxiliar de consultório' },
    ]
  },
  { 
    id: 'admin-3', 
    name: 'Amanda Borges', 
    image: null,
    type: 'admin',
    role: 'Administrador',
    details: [
        { id: 'a3-1', label: 'Gênero', value: 'Feminino' },
        { id: 'a3-2', label: 'Data de Nascimento', value: '12/09/1982' },
        { id: 'a3-3', label: 'Estado Civil', value: 'Casada' },
        { id: 'a3-4', label: 'CPF', value: '666.777.888-99' },
        { id: 'a3-5', label: 'Telefone', value: '(61) 99999-0021' },
        { id: 'a3-6', label: 'E-mail', value: 'amanda.borges@email.com' },
        { id: 'a3-7', label: 'Endereço', value: 'SHIN QL 5, Lago Norte' },
        { id: 'a3-8', label: 'Cidade / Estado', value: 'Brasília / DF' },
        { id: 'a3-9', label: 'Nacionalidade', value: 'Brasileira' },
        { id: 'a3-10', label: 'Naturalidade', value: 'Belo Horizonte / MG' },
        { id: 'a3-11', label: 'Cargo', value: 'Administrador' },
    ]
  },

  { 
    id: 'patient-1', 
    name: 'Rafael Ferreira', 
    image: null,
    type: 'patient',
    allergies: ['Poeira'],
    riskLevel: 'baixo',
    details: [
        { id: 'p1-1', label: 'Gênero', value: 'Masculino' },
        { id: 'p1-2', label: 'Data de Nascimento', value: '20/11/1985' },
        { id: 'p1-3', label: 'Estado Civil', value: 'Casado' },
        { id: 'p1-4', label: 'CPF', value: '777.888.999-00' },
        { id: 'p1-5', label: 'Telefone', value: '(61) 99999-0004' },
        { id: 'p1-6', label: 'E-mail', value: 'rafael.ferreira@email.com' },
        { id: 'p1-7', label: 'Endereço', value: 'Rua 10, Lote 5, Vicente Pires' },
        { id: 'p1-8', label: 'Cidade / Estado', value: 'Brasília / DF' },
        { id: 'p1-9', label: 'Nacionalidade', value: 'Brasileira' },
        { id: 'p1-10', label: 'Naturalidade', value: 'Porto Alegre / RS' },
        { id: 'p1-11', label: 'Alergias', value: 'Poeira' },
        { id: 'p1-12', label: 'Última consulta', value: '21/05/2025' },
    ]
  },
  { 
    id: 'patient-2', 
    name: 'Luiz Toledo', 
    image: null,
    type: 'patient',
    allergies: [],
    riskLevel: 'moderado',
    details: [
        { id: 'p2-1', label: 'Gênero', value: 'Masculino' },
        { id: 'p2-2', label: 'Data de Nascimento', value: '05/02/2000' },
        { id: 'p2-3', label: 'Estado Civil', value: 'Solteiro' },
        { id: 'p2-4', label: 'CPF', value: '888.999.000-11' },
        { id: 'p2-5', label: 'Telefone', value: '(61) 99999-0031' },
        { id: 'p2-6', label: 'E-mail', value: 'luiz.toledo@email.com' },
        { id: 'p2-7', label: 'Endereço', value: 'Quadra 101, Lote 2, Sudoeste' },
        { id: 'p2-8', label: 'Cidade / Estado', value: 'Brasília / DF' },
        { id: 'p2-9', label: 'Nacionalidade', value: 'Brasileira' },
        { id: 'p2-10', label: 'Naturalidade', value: 'Curitiba / PR' },
        { id: 'p2-11', label: 'Alergias', value: 'Nenhuma' },
        { id: 'p2-12', label: 'Última consulta', value: '15/04/2025' },
    ]
  },
  { 
    id: 'patient-3', 
    name: 'Bruce Wayne', 
    image: null,
    type: 'patient',
    allergies: ['Penicilina', 'Látex'],
    riskLevel: 'alto',
    details: [
        { id: 'p3-1', label: 'Gênero', value: 'Masculino' },
        { id: 'p3-2', label: 'Data de Nascimento', value: '19/02/1972' },
        { id: 'p3-3', label: 'Estado Civil', value: 'Solteiro' },
        { id: 'p3-4', label: 'CPF', value: '999.000.111-22' },
        { id: 'p3-5', label: 'Telefone', value: '(61) 99999-0032' },
        { id: 'p3-6', label: 'E-mail', value: 'bruce.wayne@email.com' },
        { id: 'p3-7', label: 'Endereço', value: 'Mansão Wayne, Setor de Mansões' },
        { id: 'p3-8', label: 'Cidade / Estado', value: 'Gotham / NJ' },
        { id: 'p3-9', label: 'Nacionalidade', value: 'Americana' },
        { id: 'p3-10', label: 'Naturalidade', value: 'Gotham / NJ' },
        { id: 'p3-11', label: 'Alergias', value: 'Penicilina, Látex' },
        { id: 'p3-12', label: 'Última consulta', value: '01/03/2025' },
    ]
  },
];

export const findUserById = (id: string): UserProfile | undefined => {
  return ALL_USERS.find(user => user.id === id);
};

export const getUsers = (type: 'dentist' | 'admin' | 'patient') => {
    return ALL_USERS.filter(user => user.type === type);
}

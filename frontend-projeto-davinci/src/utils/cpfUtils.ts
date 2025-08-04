import { cpf } from 'cpf-cnpj-validator';

export const validateCPF = (value: string): boolean => {
  const unmaskedValue = value.replace(/\D/g, '');
  if (unmaskedValue.length !== 11) {
    return false;
  }
  return cpf.isValid(unmaskedValue);
};

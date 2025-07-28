import { cpf } from 'cpf-cnpj-validator';

export const maskCPF = (value: string): string => {
  return value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos de novo (para o segundo bloco)
    .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Coloca um hífen entre o terceiro e o quarto dígitos
    .substring(0, 14); // Garante que o tamanho máximo seja o de um CPF formatado
};

export const validateCPF = (value: string): boolean => {
  const unmaskedValue = value.replace(/\D/g, ''); // Remove a máscara antes de validar
  if (unmaskedValue.length !== 11) {
    return false;
  }
  return cpf.isValid(unmaskedValue);
};

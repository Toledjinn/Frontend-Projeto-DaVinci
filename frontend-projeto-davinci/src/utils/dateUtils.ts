export const maskDate = (value: string): string => {
  return value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .replace(/(\d{2})(\d)/, '$1/$2') // Coloca uma barra entre o segundo e o terceiro dígitos
    .replace(/(\d{2})(\d)/, '$1/$2') // Coloca uma barra entre o segundo e o terceiro dígitos de novo
    .substring(0, 10); // Garante o tamanho máximo (DD/MM/AAAA)
};


export const isDateComplete = (date: string): boolean => {
  return date.length === 10;
};

export const maskDate = (value: string): string => {
  return value
    .replace(/\D/g, '') 
    .replace(/(\d{2})(\d)/, '$1/$2') 
    .replace(/(\d{2})(\d)/, '$1/$2') 
    .substring(0, 10);
};


export const isDateComplete = (date: string): boolean => {
  return date.length === 10;
};

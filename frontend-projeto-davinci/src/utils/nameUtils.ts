export const formatUserName = (fullName: string | undefined): string => {
  if (!fullName) {
    return '';
  }

  const names = fullName.trim().split(' ');
  if (names.length <= 1) {
    return fullName;
  }

  const firstName = names[0];

  return `${firstName}`;
};
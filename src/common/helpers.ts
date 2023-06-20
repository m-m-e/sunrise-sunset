export const capitalize = (string: string) => {
  const capitalizedFirst = string[0].toUpperCase();
  const rest = string.slice(1);

  return capitalizedFirst + rest;
}

export const removeUnderscore = (string: string) => {
  return string.replace('_', ' ')
}

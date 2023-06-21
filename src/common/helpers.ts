export const capitalize = (string: string) => {
  const capitalizedFirst = string[0].toUpperCase();
  const rest = string.slice(1);

  return capitalizedFirst + rest;
}

export const removeUnderscores = (string: string) => {
  return string.replaceAll('_', ' ')
}

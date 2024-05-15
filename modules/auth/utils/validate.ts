export const validateWord = (word: string) => word.trim().length > 0;

export const validateSeedPhrase = (words: string[]) => {
  return words.every(validateWord);
};

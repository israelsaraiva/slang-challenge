export const shuffle = (array: string[]) =>
  array.sort(() => Math.random() - 0.5);

export const scrambleLetters = (word: string) => shuffle(word.split(''));

export const createEmptyBlocks = (word: string) =>
  new Array(word.length).fill('');

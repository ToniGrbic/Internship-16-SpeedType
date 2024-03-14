import texts from "../data/texts";

export const numberOfTexts = 3;

export const randomlySelectTexts = () => {
  const selectedTexts = [];
  for (let i = 0; i < numberOfTexts; i++) {
    const index = Math.floor(Math.random() * texts.length);
    selectedTexts.push(texts[index]);
  }
  return selectedTexts;
};

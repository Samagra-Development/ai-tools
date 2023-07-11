import C from "../../../constants";

export const setCurrentText = (text, prevvalText) => {
  return {
    type: C.SET_CURRENT_TEXT,
    payload:text
  };
};

export const setTransliterationText = (prevText, newWord, startIndex, endIndex) => {
  return {
    type: C.SET_TRANSLITERATION_TEXT,
    payload: { prevText, newWord, startIndex, endIndex },
  };
};

export const clearTransliterationResult = () => {
  return {
    type: C.CLEAR_TRANSLITERATION_RESULT,
  };
};
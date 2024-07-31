import { IRxcuiResponse, ISearchResult, ISpellingResponse } from './types.ts';

export const findSearchResults = async (searchVal: string): Promise<ISearchResult> => {
  const res = await fetch(
    `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${searchVal}`,
  );
  return await res.json();
};

export const findSpellingResults = async (searchVal: string): Promise<ISpellingResponse> => {
  const res = await fetch(
    `https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${searchVal}`,
  );
  return await res.json();
};

export const findRXCUIResults = async (rxcui: string): Promise<IRxcuiResponse> => {
  const res = await fetch(
    `https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/ndcs.json`,
  );
  return await res.json();
};
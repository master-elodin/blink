export interface ISpellingResponse {
  suggestionGroup: {
    name: null;
    suggestionList: {
      suggestion: string[];
    };
  };
}

export interface IRxcuiResponse {
  ndcGroup: {
    rxcui: null;
    ndcList: {
      ndc: number[];
    },
  },
}

export interface ISearchResult {
  drugGroup: {
    name: null;
    conceptGroup: {
      tty: string;
      conceptProperties: IConceptProperties[];
    }[]
  };
}

export interface IConceptProperties {
  rxcui: string;
  name: string;
  synonym: string;
  tty: string;
  language: string;
  suppress: string;
  umlscui: '';
  psn: '';
}
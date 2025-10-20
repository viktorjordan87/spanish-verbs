// Spanish verb conjugation types
export interface TenseConjugation {
  yo?: string;
  tu?: string;
  el?: string;
  nosotros?: string;
  vosotros?: string;
  ellos?: string;
}

export interface VerbTenses {
  present?: TenseConjugation;
  preterite?: TenseConjugation;
  imperfect?: TenseConjugation;
  future?: TenseConjugation;
  conditional?: TenseConjugation;
  presentSubjunctive?: TenseConjugation;
  imperfectSubjunctive?: TenseConjugation;
  presentPerfect?: TenseConjugation;
  pastPerfect?: TenseConjugation;
  futurePerfect?: TenseConjugation;
  conditionalPerfect?: TenseConjugation;
}

export interface Verb {
  _id?: string;
  word: string;
  tenses?: VerbTenses;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateVerbRequest {
  word: string;
  tenses?: VerbTenses;
}

export type UpdateVerbRequest = Partial<CreateVerbRequest>;

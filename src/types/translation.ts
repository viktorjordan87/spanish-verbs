export interface Translation {
  _id: string;
  word: string;
  translations: {
    english: string;
    hungarian: string;
  };
  memorized?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTranslationRequest {
  word: string;
  translations: {
    english: string;
    hungarian: string;
  };
}

export interface UpdateTranslationRequest {
  word?: string;
  translations?: {
    english?: string;
    hungarian?: string;
  };
}


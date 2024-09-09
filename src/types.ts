export type DictionaryEntry = {
  [key: string]: string;
};

export interface Word {
  word: string;
  tip: string;
  phonetic: DictionaryEntry[];
  dictionary: DictionaryEntry[];
  example: DictionaryEntry[];
  remembered: boolean;
  addedAt: string;
}

export interface ActionsProps {
  onRemember: (word: string) => void;
  onDelete: (word: string) => void;
  onDeleteAll: () => void;
  onAdd: (word: string) => Promise<boolean>;
}

import { atom } from 'jotai'


export const searchResultWordsAtom = atom<{_id: string, word: string}[]>([])
import { atom } from 'recoil';

export const selectedRangeAtom = atom<{ start?: number; end?: number }>({
  key: 'selectedRangeAtom',
  default: { start: 7, end: 14 },
});

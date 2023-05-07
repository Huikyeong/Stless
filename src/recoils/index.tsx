import { atom } from 'recoil';

export const selectedRangeAtom = atom<{ start?: string; end?: string }>({
  key: 'selectedRangeAtom',
  default: { start: undefined, end: undefined },
});

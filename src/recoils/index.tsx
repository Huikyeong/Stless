import { atom } from 'recoil';

export const selectedRangeAtom = atom<{ start?: number; end?: number }>({
  key: 'selectedRangeAtom',
  default: { start: undefined, end: undefined },
});

export const zoomRangeAtom = atom<[number | undefined, number | undefined]>({
  key: 'zoomRangeAtom',
  default: [undefined, undefined],
});

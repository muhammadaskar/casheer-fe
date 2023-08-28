import { create } from 'zustand';

interface DarkModeState {
  darkMode: string | undefined;
  setDarkMode: (value: string) => void;
}

export const useDarkModeStore = create<DarkModeState>((set) => ({
  darkMode: localStorage.getItem('theme')
    ? localStorage.getItem('theme')!
    : 'dark',
  setDarkMode: (value: string) => set({ darkMode: value }),
}));

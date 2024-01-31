// zustand store for current screen

import {create} from 'zustand';

export type Screen = string;

interface CurrentScreenStore {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
}

export const useCurrentScreenStore = create<CurrentScreenStore>(set => ({
  currentScreen: '',
  setCurrentScreen: screen => set({currentScreen: screen}),
}));

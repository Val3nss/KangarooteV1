// useProjectState.ts
import { create } from 'zustand';

interface ProjectState {
  selectedCategory: string;
  selectedCard: number | null;
  isCardInfoVisible: boolean;
  setCategory: (category: string) => void;
  viewProject: (cardId: number) => void;
  closeCardInfo: () => void;
}

export const useProjectState = create<ProjectState>((set) => ({
  selectedCategory: "all",
  selectedCard: null,
  isCardInfoVisible: false,
  setCategory: (category: string) =>
    set((state) => ({
      selectedCategory: state.selectedCategory === category ? "all" : category,
      selectedCard: null,
      isCardInfoVisible: false,
    })),
  viewProject: (cardId: number) =>
    set({ selectedCard: cardId, isCardInfoVisible: true }),
  closeCardInfo: () =>
    set({ isCardInfoVisible: false, selectedCard: null }),
}));

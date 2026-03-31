import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Theme store with localStorage persistence
export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: false,
      toggle: () => set((state) => ({ isDark: !state.isDark })),
      setDark: (val) => set({ isDark: val }),
    }),
    { name: 'seisuvai-theme' }
  )
);

export const useMenuStore = create((set, get) => ({
  selectedItems: [],
  isEnquiryOpen: false,
  prefilledEvent: '',
  menuType: 'Custom',
  selectedPackage: null,

  addItem: (item) => {
    const exists = get().selectedItems.find((i) => i.id === item.id);
    if (!exists) {
      set((state) => ({ selectedItems: [...state.selectedItems, item] }));
    }
  },

  removeItem: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter((i) => i.id !== id),
    })),

  toggleItem: (item) => {
    const exists = get().selectedItems.find((i) => i.id === item.id);
    if (exists) {
      set((state) => ({
        selectedItems: state.selectedItems.filter((i) => i.id !== item.id),
      }));
    } else {
      set((state) => ({ selectedItems: [...state.selectedItems, item] }));
    }
  },

  clearItems: () => set({ selectedItems: [], selectedPackage: null }),

  openEnquiry: (payload = {}) =>
    set({ 
      isEnquiryOpen: true, 
      prefilledEvent: payload.event || '',
      menuType: payload.menuType || 'Custom',
      selectedPackage: payload.selectedPackage || null 
    }),

  closeEnquiry: () => set({ isEnquiryOpen: false }),
}));

import { create } from 'zustand';

// قمنا بإزالة IUser و isLoading لأن NextAuth سيتولى أمرهم
interface UIState {
    isDropdownOpen: boolean;
    headerTitle: string;
    toggleDropdown: () => void;
    closeDropdown: () => void;
    setHeaderTitle: (title: string) => void;
}

// تغيير اسم الـ Store ليعبر عن وظيفته الجديدة
export const useUIStore = create<UIState>((set) => ({
    isDropdownOpen: false,
    headerTitle: "Diplomas",

    toggleDropdown: () => set((state) => ({ isDropdownOpen: !state.isDropdownOpen })),
    closeDropdown: () => set({ isDropdownOpen: false }),
    setHeaderTitle: (title) => set({ headerTitle: title }),
}));
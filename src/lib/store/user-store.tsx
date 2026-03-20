import { create } from 'zustand';
import Cookies from 'js-cookie';
import { IUser } from '../types/user';

interface UserState {
    user: IUser | null;
    isLoading: boolean;
    isDropdownOpen: boolean;
    headerTitle: string;
    setUser: (user: IUser | null) => void;
    initializeUser: () => void;
    toggleDropdown: () => void;
    closeDropdown: () => void;
    setHeaderTitle: (title: string) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isLoading: true,
    isDropdownOpen: false,
    headerTitle: "Diplomas",

    setUser: (user) => {
        if (user) Cookies.set('user_info', JSON.stringify(user), { expires: 7 });
        else Cookies.remove('user_info');
        set({ user, isLoading: false });
    },

    initializeUser: () => {
        const savedUser = Cookies.get('user_info');
        if (savedUser) {
            try { set({ user: JSON.parse(savedUser), isLoading: false }); }
            catch { set({ user: null, isLoading: false }); }
        } else { set({ isLoading: false }); }
    },

    toggleDropdown: () => set((state) => ({ isDropdownOpen: !state.isDropdownOpen })),
    closeDropdown: () => set({ isDropdownOpen: false }),
    setHeaderTitle: (title) => set({ headerTitle: title }),

    logout: () => {
        Cookies.remove('token');
        Cookies.remove('user_info');
        set({ user: null, isDropdownOpen: false });
        window.location.href = '/login';
    },
}));
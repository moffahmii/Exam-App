import { create } from 'zustand';
import Cookies from 'js-cookie';
import { IUser } from '../types/user';
import { logoutAction } from '../api/auth/auth-api';

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
    logout: () => Promise<void>;
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

    logout: async () => {
        try {
            // السيرفر أكشن هنا هيمسح الـ httpOnly cookies بنجاح
            await logoutAction();
        } catch (error) {
            // إذا حصل Error غالباً بيكون بسبب الـ redirect اللي جوه الـ Action 
            // وده طبيعي في Next.js، المهم إن الكوكيز اتمسحت فعلاً
        }

        // تنظيف الـ State داخلياً
        set({ user: null, isDropdownOpen: false });

        // تأكيد التحويل (احتياطي)
        window.location.href = '/login';
    }
}));
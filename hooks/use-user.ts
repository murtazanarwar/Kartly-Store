import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import toast from 'react-hot-toast';
import { User } from '@/types';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUser = create(
    persist<UserState>(( set ) => ({
        user: null,
        setUser: ( user: User ) => {
            set({ user: user });
            toast.success("Log In Sucessfull");
        },
        clearUser: () => {
            set({ user: null });
        }
    }), {
        name: "user-storage",
        storage: createJSONStorage(() => localStorage)
    })
);

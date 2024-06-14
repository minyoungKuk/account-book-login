import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  id: string;
  nickname: string;
  avatar: string | null;
}

interface LoginState {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: User | null;
  logIn: (token: string, user: User) => void;
  logOut: () => void;
  setUser: (user: User) => void;
}

const useLoggedIn = create(
  persist<LoginState>(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      user: null,
      logIn: (token: string, user: User) =>
        set({ isLoggedIn: true, accessToken: token, user }),
      logOut: () => {
        set({ isLoggedIn: false, accessToken: null, user: null });
        localStorage.removeItem("accessToken");
      },
      setUser: (user) => set({ user }),
    }),
    {
      name: "login-store",
      // getStorage: () => localStorage,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useLoggedIn;

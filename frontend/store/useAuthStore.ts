import parseJwtPayload from "@/utils/parseJwtPayload";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface User {
  id?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

interface AuthStore {
  user?: User | null;
  accessToken?: string | null;
  expires?: string | null;
  mode: "dark" | "light";
  setUser: (user: User) => void;
  updateUser: (user: User, data: Partial<User>) => void;
  setAccessToken: (accessToken: string) => void;
  getIsAuthenticated: () => boolean;
  setMode: (mode: "dark" | "light") => void;
  clear: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      expires: null,
      mode: "dark",
      setUser: (user: User) => set({ user }),
      updateUser: (data) =>
        set((state) => ({ user: { ...state.user, ...data } })),
      setAccessToken: (accessToken: string) =>
        set({
          accessToken,
          expires: parseJwtPayload(accessToken)?.expiredAt,
        }),
      getIsAuthenticated: () => {
        return get().expires
          ? new Date() < new Date(get().expires as string)
          : false;
      },
      setMode: (mode: "dark" | "light") => {
        set({
          mode: mode,
        });
      },
      clear: () =>
        set({
          user: null,
          accessToken: null,
          expires: null,
        }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;

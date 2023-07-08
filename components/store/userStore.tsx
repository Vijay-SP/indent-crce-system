import { Admin, Record } from "pocketbase"
import { create } from "zustand"

export interface UserStoreType {
  user?: Record | Admin | null
  setUser: (user: Record | Admin | null) => void
  clear: () => void
}

export const useUserStore = create<UserStoreType>((set) => ({
  setUser: (user) => set({ user: user }),
  clear: () => set({ user: null }),
}))

import { create } from "zustand"

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("uzchat-theme") || "coffee",
    setTheme: (theme) => {
        localStorage.setItem("uzchat-theme", theme)
        set({ theme })
    }
}))
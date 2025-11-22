import {createContext, type ReactNode, useContext, useEffect, useState} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<{
    theme: string,
    setTheme: (theme: string) => void
}>({
    theme: 'light',
    setTheme: () => {}
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    const setTheme = (newTheme: string) => {
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
            );
        }

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
    return useContext(ThemeContext);
}

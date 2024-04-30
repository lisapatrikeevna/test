import { createContext, ReactNode, useContext, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { darkTheme, lightTheme, Theme } from './themes';

interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const [theme, setTheme] = useState<'light' | 'dark'>(savedTheme || 'light');

  useEffect(() => {
    const root = document.documentElement;
    const themeVars = theme === 'light' ? lightTheme : darkTheme;
    Object.keys(themeVars).forEach(key => {
      root.style.setProperty(`--${key}`, themeVars[key as keyof Theme]);
    });
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
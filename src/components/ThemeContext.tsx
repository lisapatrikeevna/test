import { createContext,  useContext,  Dispatch, SetStateAction } from 'react';


interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>;

}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);




export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

import React, { createContext, useEffect, useState } from 'react';

export type ThemeType = 'default' | 'light';

type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'default',
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    // Try to get theme from localStorage
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    return savedTheme && (savedTheme === 'default' || savedTheme === 'light') ? savedTheme : 'default';
  });

  useEffect(() => {
    // Save theme to localStorage whenever it changes
    localStorage.setItem('theme', theme);
    
    // Apply theme class to document element
    document.documentElement.classList.remove('theme-default', 'theme-pastel', 'theme-vivid', 'theme-light');
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

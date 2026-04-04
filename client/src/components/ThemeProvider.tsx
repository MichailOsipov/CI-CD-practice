import React, { createContext, useEffect, type ReactNode, useContext } from 'react';

type ThemeType = 'light' | 'dark' | 'spring';

type ThemeStore = {
  onToggleTheme: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeStore>({ onToggleTheme: () => { /* do nothing */ } });

const setTheme = (theme: ThemeType) => {
  const root = document.documentElement;
  root.classList.remove('light', 'dark', 'spring');
  root.classList.add(theme);
};

export const useTheme = () => {
  const { onToggleTheme } = useContext(ThemeContext);

  return {
    onToggleTheme
  };
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // TODO move to uselayouteffect
  // TODO add localstorage
  // TODO fix classnames
  // TODO disabled button classnames
  useEffect(() => {
    setTheme('light');
  }, []);

  return (
    <ThemeContext.Provider value={{ onToggleTheme: setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

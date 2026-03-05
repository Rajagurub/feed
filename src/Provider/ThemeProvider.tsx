import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { theme } from "../theme";
const ThemeContext = createContext(theme);
interface Props {
  children: ReactNode;
}
export const ThemeProvider = ({ children }: Props) => {
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
};
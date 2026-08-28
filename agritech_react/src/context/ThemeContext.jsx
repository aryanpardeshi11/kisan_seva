import React, { createContext, useContext, useState, useEffect } from 'react';
import { GEMINI_API_KEY } from '../config/apiConfig';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(GEMINI_API_KEY || '');
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    setGeminiApiKey(GEMINI_API_KEY || '');
  }, [GEMINI_API_KEY]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, geminiApiKey, language, setLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

import React, { useEffect, useState } from 'react';
import ThemeContext from './themeContext.js';
import {light,dark} from '../themeColors.js'

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        () => localStorage.getItem('theme') || 'light'
    );

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = (newTheme) =>
        setTheme(newTheme);

    const getThemeColors = () => {
        if (theme === 'light') {
            return light
        } else {
            return dark
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, getThemeColors }}>
            {children}
        </ThemeContext.Provider>
    );
};


export default ThemeProvider
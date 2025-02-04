// app/components/ThemeSwitcher.tsx
'use client';
import { useState, useEffect } from 'react';
import styles from '../styles/ThemeSwitcher.module.css'

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark') {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleToggle = () => {
    setIsDark((prev) => !prev);
  };
 
  return (
    <div className={styles.daynight}>
      <div className={styles.toggle}>
        <input 
          className={styles.toggle_input} 
          type="checkbox"
          checked={isDark}
          onChange={handleToggle}/>
        <div className={styles.toggle_bg}></div>
        <div className={styles.toggle_switcher}>
          <div className={styles.toggle_switcher_figure}></div>
          <div className={styles.toggle_switcher_figureAlt}></div>
        </div>
      </div>
    </div>
  );
}




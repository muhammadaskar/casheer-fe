import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark'
  );
  const htmlClasses = document.querySelector('html');

  const toggleDarkMode = () => {
    darkMode === 'dark' ? setDarkMode('light') : setDarkMode('dark');
  };

  useEffect(() => {
    if (darkMode === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      htmlClasses?.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      htmlClasses?.classList.remove('dark');
    }
  }, [darkMode, htmlClasses]);

  return {
    darkMode,
    toggleDarkMode,
  };
};

export default useDarkMode;

import { useCallback, useState } from 'react';

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  );
  const htmlClasses = document.querySelector('html');

  //   const toggleDarkMode = () => {
  //     darkMode === '' ? setDarkMode('dark') : setDarkMode('');
  //   };

  const toggleDarkMode = useCallback(() => {
    if (darkMode === 'light') {
      setDarkMode('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      htmlClasses?.classList.add('dark');
    } else {
      setDarkMode('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      htmlClasses?.classList.remove('dark');
    }
  }, [darkMode, htmlClasses]);

  const onWindowMatch = () => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  onWindowMatch();

  //   useEffect(() => {
  //     if (darkMode === 'dark') {
  //       document.documentElement.classList.add('dark');
  //       localStorage.setItem('theme', 'dark');
  //       htmlClasses?.classList.add('dark');
  //     } else {
  //       document.documentElement.classList.remove('dark');
  //       localStorage.setItem('theme', 'light');
  //       htmlClasses?.classList.remove('dark');
  //     }
  //   }, [darkMode, htmlClasses]);

  return {
    darkMode,
    toggleDarkMode,
  };
};

export default useDarkMode;

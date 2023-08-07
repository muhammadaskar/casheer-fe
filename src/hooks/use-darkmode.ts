import { MyContext } from '@/context';
import { Types } from '@/types/reducer-type';
import { useContext, useEffect } from 'react';

const useDarkMode = () => {
  const { state, dispatch } = useContext(MyContext);
  const htmlClasses = document.querySelector('html');

  const toggleDarkMode = () => {
    state.darkMode === 'dark'
      ? dispatch({
          type: Types.DarkMode,
          payload: 'light',
        })
      : dispatch({
          type: Types.DarkMode,
          payload: 'dark',
        });
  };

  useEffect(() => {
    if (state.darkMode === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      htmlClasses?.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      htmlClasses?.classList.remove('dark');
    }
  }, [state.darkMode, htmlClasses]);

  return {
    toggleDarkMode,
  };
};

export default useDarkMode;

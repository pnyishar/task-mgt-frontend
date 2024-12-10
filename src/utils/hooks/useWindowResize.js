import { useEffect } from 'react';

const useWindowResize = () => {
  useEffect(() => {}, [window.innerWidth]);
};

export default useWindowResize;

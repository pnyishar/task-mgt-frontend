import { RouterProvider } from 'react-router-dom';
import Aos from 'aos';
import { useEffect } from 'react';
import routers from '@/routes';

function App() {
  useEffect(() => {
    Aos.init({
      duration: 500,
      easing: 'ease',
    });
  }, []);

  return (
    <div className="h-screen">
      <RouterProvider router={routers} />
    </div>
  );
}

export default App;

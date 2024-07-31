import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';

const router = createBrowserRouter([{ path: '/*', element: <App /> }]);

const AppWrapper = () => {
  return <RouterProvider router={router} />;
};

export default AppWrapper;
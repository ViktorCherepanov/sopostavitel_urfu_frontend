import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout.tsx';
import { MainPage } from './pages/MainPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'results/:sessionId',
        element: <MainPage />,
      },
      {
        path: 'profile',
        element: <div>Страница профиля (в разработке)</div>,
      },
      {
        path: 'cms',
        element: <div>Страница моей CMS (в разработке)</div>,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
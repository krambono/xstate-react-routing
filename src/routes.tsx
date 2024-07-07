import { createBrowserRouter, Navigate, Outlet, RouteObject } from 'react-router-dom';
import { Home } from './Home';
import { Login } from './Login';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <div className="p-8 max-w-screen-md mx-auto">
        <Outlet />
      </div>
    ),
    children: [
      {
        path: '/',
        element: <Navigate to="/login" />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'home',
        element: <Home />,
      },
    ],
  },
];

// React Router does not export the Router type, so we can get it like this:
export type Router = ReturnType<typeof createBrowserRouter>;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { routes } from './routes';
import { AuthenticationContext } from './authentication-context';
import { createAuthenticationMachine } from './authentication';
import { createActor } from 'xstate';

const router = createBrowserRouter(routes);
const machine = createAuthenticationMachine({ router, login: () => new Promise(resolve => setTimeout(resolve, 1000)) });
const actor = createActor(machine);
actor.start();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthenticationContext.Provider value={actor}>
      <RouterProvider router={router} />
    </AuthenticationContext.Provider>
  </React.StrictMode>,
);

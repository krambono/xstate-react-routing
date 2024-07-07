import { fromPromise, setup } from 'xstate';
import { Router } from './routes';

type Dependencies = {
  router: Router;
  login: () => Promise<void>;
};

export const createAuthenticationMachine = ({ router, login }: Dependencies) =>
  setup({
    types: {
      events: {} as { type: 'log out' } | { type: 'log in' },
    },
    actions: {
      logout: () => {
        router.navigate('/login');
      },
      'go to home': () => {
        router.navigate('/home');
      },
    },
    actors: {
      'log in': fromPromise(() => login()),
    },
  }).createMachine({
    context: {},
    id: 'Authentication',
    initial: 'Unauthenticated',
    states: {
      Unauthenticated: {
        on: {
          'log in': {
            target: 'Authenticating',
          },
        },
      },
      Authenticating: {
        invoke: {
          input: {},
          onDone: {
            target: 'Authenticated',
            actions: 'go to home',
          },
          src: 'log in',
        },
      },
      Authenticated: {
        on: {
          'log out': {
            target: 'Unauthenticated',
            actions: {
              type: 'logout',
            },
          },
        },
      },
    },
  });

export type AuthenticationMachine = ReturnType<typeof createAuthenticationMachine>;

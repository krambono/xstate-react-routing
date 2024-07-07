import { createContext, useContext } from 'react';
import { AuthenticationMachine } from './authentication';
import { Actor } from 'xstate';

export const AuthenticationContext = createContext<Actor<AuthenticationMachine> | null>(null);

export const useAuthentication = () => {
  const actor = useContext(AuthenticationContext);

  if (!actor) {
    throw new Error('useAuthentication must be used within an AuthenticationProvider');
  }

  return actor;
};

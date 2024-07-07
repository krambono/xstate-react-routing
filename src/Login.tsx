import { useSelector } from '@xstate/react';
import { useAuthentication } from './authentication-context';

export const Login = () => {
  const actor = useAuthentication();
  const isAuthenticating = useSelector(actor, state => state.matches('Authenticating'));

  return (
    <div>
      <h1 className="text-xl font-bold">Login page</h1>
      <div className="mt-5">
        {isAuthenticating && <p>Authenticating...</p>}

        {!isAuthenticating && (
          <button className="btn" onClick={() => actor.send({ type: 'log in' })}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

import { useAuthentication } from './authentication-context';

export const Home = () => {
  const actor = useAuthentication();

  return (
    <div>
      <h1 className="text-xl font-bold">Home</h1>
      <div className="mt-5">
        <button className="btn" onClick={() => actor.send({ type: 'log out' })}>
          Logout
        </button>
      </div>
    </div>
  );
};

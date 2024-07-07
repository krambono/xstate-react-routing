import { beforeEach, describe, expect, it } from 'vitest';
import { Actor, createActor } from 'xstate';
import { AuthenticationMachine, createAuthenticationMachine } from './authentication';
import { createMemoryRouter } from 'react-router-dom';
import { Router, routes } from './routes';

describe('Authentication', () => {
  let router: Router;
  let actor: Actor<AuthenticationMachine>;

  beforeEach(() => {
    router = createMemoryRouter(routes);
    const machine = createAuthenticationMachine({ router, login: async () => {} });
    actor = createActor(machine);
    actor.start();
  });

  describe('Unauthenticated state', () => {
    it("should transition to Authenticating state on 'log in' event", () => {
      // given

      // when
      actor.send({ type: 'log in' });

      // then
      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toBe('Authenticating');
    });
  });

  describe('Authenticating state', () => {
    it('should transition to Authenticated state when login success', async () => {
      // given
      actor.send({ type: 'log in' });

      // when
      await new Promise(resolve => setTimeout(resolve));

      // then
      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toBe('Authenticated');
    });

    it('should navigate to home when authenticated', async () => {
      // given
      actor.send({ type: 'log in' });

      // when
      await new Promise(resolve => setTimeout(resolve));

      // then
      expect(router.state.location.pathname).toBe('/home');
    });
  });

  describe('Authenticated state', () => {
    it("should transition to Unauthenticated state on 'log out' event", async () => {
      // given
      actor.send({ type: 'log in' });
      await new Promise(resolve => setTimeout(resolve));

      // when
      actor.send({ type: 'log out' });

      // then
      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toBe('Unauthenticated');
    });

    it("should navigate to login on 'log out' event", async () => {
      // given
      actor.send({ type: 'log in' });
      await new Promise(resolve => setTimeout(resolve));

      // when
      actor.send({ type: 'log out' });

      // then
      expect(router.state.location.pathname).toBe('/login');
    });
  });
});

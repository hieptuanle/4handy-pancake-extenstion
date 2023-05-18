import React from 'react';
import { useForm } from 'react-hook-form';
import { atom, useAtom } from 'jotai';

type TAuthentication = {
  loggedIn: boolean;
  username: string;
  displayName: string;
  token: string | null;
};

export const authenticationAtom = atom<TAuthentication>(
  (localStorage.getItem('webworkauth')
    ? JSON.parse(localStorage.getItem('webworkauth') || '')
    : null) ?? {
    loggedIn: false,
    username: '',
    displayName: '',
    token: '',
  }
);

export const persistentAuthenticationAtom = atom(
  (get) => get(authenticationAtom),
  (get, set, update: Partial<TAuthentication>) => {
    const current = get(authenticationAtom);
    const next = { ...current, ...update };
    localStorage.setItem('webworkauth', JSON.stringify(next));
    set(authenticationAtom as any, next);
  }
);

export const AuthenticationForm: React.FC = () => {
  const [authentication, setAuthentication] = useAtom(
    persistentAuthenticationAtom
  );

  const { register, handleSubmit } = useForm();
  const onSubmit: any = (data: any) => {
    console.log({ data });
    fetch('https://work.4-handy.com/api_v2/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const { user, token } = res;

        setAuthentication({
          loggedIn: true,
          username: user.username,
          displayName: user.displayName,
          token,
        });
      });
  };
  return (
    <div>
      {!authentication.loggedIn && (
        <div>
          <h1>Login Webwork</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <label htmlFor="username">Username:</label>
            <input
              {...register('username')}
              type="text"
              id="username"
              name="username"
            />
            <label htmlFor="password">Password:</label>
            <input
              {...register('password')}
              type="password"
              id="password"
              name="password"
            />
            <input type="submit" />
          </form>
        </div>
      )}

      {authentication.loggedIn && (
        <div>
          <h1>Thông tin đăng nhập</h1>
          <p>Username: {authentication.username}</p>
          <p>Display name: {authentication.displayName}</p>
          <button
            onClick={() => {
              setAuthentication({
                loggedIn: false,
                username: '',
                displayName: '',
                token: null,
              });
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

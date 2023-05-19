import React from 'react';
import { useForm } from 'react-hook-form';
import { atom, useAtom, useSetAtom } from 'jotai';
import { Button, Container, Group, Text, TextInput } from '@mantine/core';

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

export const LoginForm: React.FC = () => {
  const setAuthentication = useSetAtom(persistentAuthenticationAtom);

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <TextInput label="Username" {...register('username')}></TextInput>
      <TextInput
        type="password"
        label="Password"
        {...register('password')}
      ></TextInput>
      <Button type="submit">Login</Button>
    </form>
  );
};

export const AuthenticationForm: React.FC = () => {
  const [authentication, setAuthentication] = useAtom(
    persistentAuthenticationAtom
  );

  return (
    <Container fluid>
      {!authentication.loggedIn && <Text size="lg">Login</Text>}

      {authentication.loggedIn && (
        <Group>
          <Text fz="md">Hello {authentication.displayName}!</Text>
          <Button
            variant="outline"
            size="sm"
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
          </Button>
        </Group>
      )}
    </Container>
  );
};

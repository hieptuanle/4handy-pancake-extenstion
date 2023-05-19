import React from 'react';
import { AppShell, Container, Header, MantineProvider } from '@mantine/core';
import './index.css';
import {
  AuthenticationForm,
  LoginForm,
  authenticationAtom,
} from './Authentication';
import { useAtom } from 'jotai';
import { CustomerInfo } from './CustomerInfo';

const Sidebar: React.FC = React.memo(() => {
  const [authentication] = useAtom(authenticationAtom);
  return (
    <MantineProvider>
      <AppShell
        header={
          <Header height={60} p="xs">
            <AuthenticationForm />
          </Header>
        }
      >
        {!authentication.loggedIn && <LoginForm />}
        {authentication.loggedIn && <CustomerInfo></CustomerInfo>}
      </AppShell>
    </MantineProvider>
  );
});

export default Sidebar;

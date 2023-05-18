import React from 'react';
import './index.css';
import { AuthenticationForm, authenticationAtom } from './Authentication';
import { useAtom } from 'jotai';
import { CustomerInfo } from './CustomerInfo';

const Sidebar: React.FC = React.memo(() => {
  const [authentication] = useAtom(authenticationAtom);
  return (
    <div className="container">
      <AuthenticationForm />
      {authentication.loggedIn && <CustomerInfo></CustomerInfo>}
    </div>
  );
});

export default Sidebar;

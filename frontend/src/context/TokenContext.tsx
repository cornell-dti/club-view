import React from 'react';
import { createContext, useState } from 'react';

type tokenState = {
  tokenID: string;
};

const initialState: tokenState = {
  tokenID: '',
};

const TokenContext = React.createContext(null);

type TokenProviderProps = {
  children: React.ReactNode;
};

export const TokenProvider = ({ children }: TokenProviderProps) => {
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider value={(token, setToken)}>
      {children}
    </TokenContext.Provider>
  );
};

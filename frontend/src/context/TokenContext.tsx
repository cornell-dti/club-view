import React from 'react';
import { createContext, useState } from 'react';

type tokenState = {
  tokenID: string;
  setToken: (tokenid: string) => void;
};

const initialState: tokenState = {
  tokenID: '',
  setToken: () => {},
};

export const TokenContext = React.createContext(initialState);

type TokenProviderProps = {
  children: React.ReactNode;
};

export const TokenProvider = ({ children }: TokenProviderProps) => {
  const [tokenID, changeToken] = useState('');

  const setToken = (tokenid: string) => {
    changeToken(tokenid);
  };

  return (
    <TokenContext.Provider value={{ tokenID, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

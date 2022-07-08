import { createContext, useContext } from 'react';

export type User = {
  'id': string,
  'email': string,
  'isLogged': boolean
};

export const NullUser = {
  id: '',
  email: '',
  isLogged: false,
};

export type UserContent = {
  user: User,
  setUser: (usr: User) => void,
};

export const UserContext = createContext<UserContent>({
  user: NullUser,
  setUser: () => { /* */ },
});

export const useGlobalContext = () => useContext(UserContext);

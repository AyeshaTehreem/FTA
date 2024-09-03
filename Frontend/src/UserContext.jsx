import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    role: '',
    isLoggedIn: false,
  });

  const login = (username, email, role) => {
    setUser({
      username,
      email,
      role,
      isLoggedIn: true,
    });
  };

  const logout = () => {
    setUser({
      username: '',
      email: '',
      role: '',
      isLoggedIn: false,
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

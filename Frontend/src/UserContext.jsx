import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    role: '',
    isLoggedIn: false,
  });

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await fetch('http://localhost:5002/auth/session', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUser({
            username: data.username,
            email: data.email,
            role: data.role,
            isLoggedIn: true,
          });
        }
      } catch (error) {
        console.error('Error fetching session details:', error);
      }
    };

    fetchSessionDetails();
  }, []);

  const login = (username, email, role) => {
    setUser({
      username,
      email,
      role,
      isLoggedIn: true,
    });
  

    // Logging the updated values of the user
    console.log('User logged in:');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Role:', role);
    console.log('isLoggedIn:', true);
  };
  useEffect(() => {
    if (user.isLoggedIn) {
      console.log('User logged in:');
      console.log('Username:', user.username);
      console.log('Email:', user.email);
      console.log('Role:', user.role);
      console.log('isLoggedIn:', user.isLoggedIn);
    }
  }, [user]);
  

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

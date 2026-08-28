import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const initialRegisteredUsers = {
  'demo': {
    name: 'Sajith Disanayake',
    phone: 'demo',
    password: '123',
    userType: 'Farmer Network',
    location: 'Latur, Maharashtra',
    landArea: '8.5 Acres',
  },
  '9822012345': {
    name: 'Suresh Patil',
    phone: '9822012345',
    password: '123',
    userType: 'Farmer Network',
    location: 'Washim, Maharashtra',
    landArea: '12.0 Acres',
  },
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(initialRegisteredUsers);
  const [currentUser, setCurrentUser] = useState(initialRegisteredUsers['demo']);

  const registerUser = ({ name, phone, password, userType, location, landArea }) => {
    const key = phone.trim().toLowerCase();
    if (users[key]) {
      return `Account with phone ${phone} already exists! Please login.`;
    }
    const newUser = {
      name: name.trim(),
      phone: phone.trim(),
      password,
      userType: userType || 'Farmer Network',
      location: location.trim() || 'Latur, Maharashtra',
      landArea: landArea.trim() || '5.0 Acres',
    };
    setUsers((prev) => ({ ...prev, [key]: newUser }));
    setCurrentUser(newUser);
    return null; // Success
  };

  const loginUser = (identifier, password) => {
    const key = identifier.trim().toLowerCase();
    if (!users[key]) {
      return `No account found for "${identifier}". Please Sign Up first!`;
    }
    if (users[key].password !== password) {
      return 'Incorrect password. Please try again.';
    }
    setCurrentUser(users[key]);
    return null; // Success
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, registerUser, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

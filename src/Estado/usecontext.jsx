// En tu usecontext.jsx
import React, { createContext, useContext, useState } from 'react';

const EmailContext = createContext();

export const EmailProvider = ({ children, userEmail }) => {
  const [user, setUser] = useState({ email: userEmail }); // Inicializa el usuario con el correo electrónico

  console.log("User context:", user);

  return (
    <EmailContext.Provider value={{ user, setUser }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => useContext(EmailContext);

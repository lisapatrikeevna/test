import React from 'react';

interface AuthContextProps {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = React.createContext<AuthContextProps>({ isLoggedIn: false, setIsLoggedIn: () => {} });

export default AuthContext;
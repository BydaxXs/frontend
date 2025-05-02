import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ( {children} ) => {
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [message, setMessage] = useState("");

    const data = {
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        message,
        setMessage
    }
    return(
        <AuthContext.Provider value = {data}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider; 
import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = ( {children} ) => {

    const [permisson, setPermisson] = useState("");
    const [ambientPort, setAmbientPort] = useState("");
    const [codePermisson, setCodePermisson] = useState("");
    const [costCenterCode, setCostCenterCode] = useState("");
    
    const data = {
        permisson,
        setPermisson,
        ambientPort,
        setAmbientPort,
        codePermisson, 
        setCodePermisson,
        costCenterCode, 
        setCostCenterCode
    }

    return(
        <UserContext.Provider value = {data}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider; 
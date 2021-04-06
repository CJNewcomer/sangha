import React, { useContext, createContext, useState } from 'react';


const OtherUserContext = createContext();
export const useOtherUserContext = () => useContext(OtherUserContext);

const OtherUserProvider = ({ children }) => {
    const [otherUser, setOtherUser] = useState();

    return (
        <OtherUserContext.Provider 
        value={{ otherUser, setOtherUser }}
        >{children}
        </OtherUserContext.Provider>
    );
}

export default OtherUserProvider;
import React, {createContext, useState, useEffect, useContext} from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import {getLoggedUser, getUser} from "../utils/api";

const AuthContextProfileData = createContext();

export const AuthProviderProfileData = ({children}) => {
    const {authTokens} = useContext(AuthContext);
    const [user, setUser] = useState(null);

    const fetchProfileData = async () => {
        try {
            const response = await getLoggedUser(authTokens);
            setUser(response.data);
        } catch (error) {
            console.error("Failed to fetch profile data:", error);
        }
    };

    useEffect(() => {
        if (authTokens) {
            fetchProfileData();
        }
    }, [authTokens]);

    return (
        <AuthContextProfileData.Provider value={{user, fetchProfileData}}>
            {children}
        </AuthContextProfileData.Provider>
    );
};

export default AuthContextProfileData;

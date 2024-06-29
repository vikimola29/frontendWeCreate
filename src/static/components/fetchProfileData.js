import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const AuthContextProfileData = createContext();

export const AuthProviderProfileData = ({ children }) => {
    const { authTokens } = useContext(AuthContext);
    const [user, setUser] = useState(null);

    const fetchProfileData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/backend/api/profile/', {
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`
                }
            });
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
        <AuthContextProfileData.Provider value={{ user, fetchProfileData }}>
            {children}
        </AuthContextProfileData.Provider>
    );
};

export default AuthContextProfileData;
// import React, {createContext, useState} from "react";
// import axios from "axios";
// import jwtDecode from "jwt-decode";
//
// const AuthContextProfileData = createContext();
//
// export const AuthProviderProfileData = ({children}) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated'));
//     console.log('isAuthenticated', isAuthenticated)
//     const [user, setUser] = useState(() => {
//         const token = localStorage.getItem('authTokens');
//         if (token) {
//             try {
//                 return jwtDecode(token);
//             } catch (error) {
//                 console.error('Invalid token:', error);
//                 localStorage.removeItem('authTokens');
//                 return null;
//             }
//         }
//         return null;
//     });
//
//     const fetchProfileData = async () => {
//         try {
//             const token = localStorage.getItem('authTokens');
//             // console.log("Access token:", token)
//             // if (token === null) {
//             //     const token = localStorage.getItem('authTokens.refresh');
//             //     console.log("Refresh token:", token)
//             //
//             // }
//
//             const response = await axios.get('http://127.0.0.1:8000/backend/api/profile/', {
//                 // headers: {
//                 //     'Authorization': `Bearer ${token}`
//                 // }
//             });
//
//             setUser(response.data);
//             console.log("USER:", user)
//         } catch (error) {
//
//             console.error("Failed to fetch profile data:", error);
//         }
//     };
//
//     return (
//         <AuthContextProfileData.Provider value={{isAuthenticated, setIsAuthenticated, user, fetchProfileData}}>
//             {children}
//         </AuthContextProfileData.Provider>
//     );
// };
//
// export default AuthContextProfileData;
